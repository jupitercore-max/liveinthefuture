"""Smoke tests for Watch Market actions."""
import asyncio
import os
import sys
import unittest

SPACE_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..")
APP_DB_PATH = os.path.join(SPACE_ROOT, "app.db")
sys.path.insert(0, os.path.join(SPACE_ROOT, "actions"))


class FakeCtx:
    def app_db_path(self) -> str:
        return APP_DB_PATH


class TestGetListings(unittest.TestCase):
    def test_returns_listings(self):
        from get_listings import Request, main
        result = asyncio.run(main(FakeCtx(), Request()))
        self.assertGreater(result.total, 0)
        self.assertIsInstance(result.listings, list)
        if result.listings:
            item = result.listings[0]
            self.assertTrue(hasattr(item, "brand"))
            self.assertTrue(hasattr(item, "price"))

    def test_filter_by_brand(self):
        from get_listings import Request, main
        result = asyncio.run(main(FakeCtx(), Request(brand="Rolex")))
        for item in result.listings:
            self.assertEqual(item.brand, "Rolex")

    def test_search(self):
        from get_listings import Request, main
        result = asyncio.run(main(FakeCtx(), Request(search="Submariner")))
        self.assertIsInstance(result.total, int)


class TestGetAnalytics(unittest.TestCase):
    def test_returns_analytics(self):
        from get_analytics import Request, main
        result = asyncio.run(main(FakeCtx(), Request()))
        self.assertGreater(result.total_listings, 0)
        self.assertIsInstance(result.brands, list)
        self.assertIsInstance(result.groups, list)
        if result.brands:
            self.assertTrue(hasattr(result.brands[0], "brand"))


class TestGetWatchlist(unittest.TestCase):
    def test_returns_targets(self):
        from get_watchlist import Request, main
        result = asyncio.run(main(FakeCtx(), Request()))
        self.assertEqual(len(result.targets), 5)
        self.assertEqual(result.targets[0].name, "Rolex Milgauss")


if __name__ == "__main__":
    unittest.main()
