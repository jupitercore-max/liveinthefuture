#!/usr/bin/env python3
"""Parse national OEWS data from BLS HTML page (May 2023) and scrape OOH occupation finder."""
import json
import re
import os
import sys

# Parse the May 2023 national data that was fetched via web_fetch
# The data format from the HTML table: 
# Occ_code | Title | Level | Employment | Emp RSE | Emp per 1000 | Median hourly | Mean hourly | Annual mean | Mean wage RSE

def parse_national_oews(text):
    """Parse the scraped national OEWS table text."""
    occupations = []
    lines = text.strip().split('\n')
    
    for line in lines:
        # Lines with pipe-separated data from the BLS table
        if '|' in line and any(level in line for level in ['total', 'major', 'minor', 'broad', 'detail']):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 9:
                occ_code = parts[0].strip()
                title = parts[1].strip()
                level = parts[2].strip()
                
                # Parse employment
                emp_str = parts[3].replace(',', '').replace('(8)', '').strip()
                try:
                    employment = int(emp_str)
                except:
                    employment = None
                
                # Parse median hourly
                median_hourly_str = parts[6].replace('$', '').replace('(4)', '').strip()
                try:
                    median_hourly = float(median_hourly_str)
                except:
                    median_hourly = None
                
                # Parse mean hourly
                mean_hourly_str = parts[7].replace('$', '').replace('(4)', '').strip()
                try:
                    mean_hourly = float(mean_hourly_str)
                except:
                    mean_hourly = None
                
                # Parse annual mean
                annual_mean_str = parts[8].replace('$', '').replace(',', '').replace('(4)', '').strip()
                try:
                    annual_mean = int(annual_mean_str)
                except:
                    annual_mean = None
                
                occupations.append({
                    'occ_code': occ_code,
                    'title': title,
                    'level': level,
                    'employment': employment,
                    'median_hourly_wage': median_hourly,
                    'mean_hourly_wage': mean_hourly,
                    'annual_mean_wage': annual_mean,
                    'annual_median_wage': round(median_hourly * 2080) if median_hourly else None,
                    'data_year': '2023',
                })
    
    return occupations

# OOH data that was already scraped  
def parse_ooh_data(text):
    """Parse OOH occupation finder data from web_fetch output."""
    occupations = []
    lines = text.strip().split('\n')
    
    for line in lines:
        if '|' in line:
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 6:
                occ = parts[0]
                edu = parts[1]
                training = parts[2]
                new_jobs = parts[3]
                growth = parts[4]
                pay = parts[5]
                
                if occ and edu and not occ.startswith('OCCUPATION') and not occ.startswith('---'):
                    occupations.append({
                        'occupation': occ,
                        'entry_level_education': edu,
                        'on_the_job_training': training,
                        'projected_new_jobs': new_jobs,
                        'projected_growth_rate': growth,
                        'median_pay_2024': pay,
                    })
    
    return occupations

if __name__ == '__main__':
    print("Parse scripts ready. Use from main data assembly script.")
