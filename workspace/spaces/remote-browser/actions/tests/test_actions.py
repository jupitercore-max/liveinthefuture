"""Smoke tests for Remote Browser actions."""
import asyncio
import unittest
from unittest.mock import MagicMock


class TestClick(unittest.TestCase):
    def test_request_model(self):
        from click import Request
        req = Request(x=100, y=200)
        self.assertEqual(req.x, 100)
        self.assertEqual(req.y, 200)


class TestNavigate(unittest.TestCase):
    def test_request_model(self):
        from navigate import Request
        req = Request(url="https://example.com")
        self.assertEqual(req.url, "https://example.com")


class TestPressKey(unittest.TestCase):
    def test_request_model(self):
        from press_key import Request
        req = Request(key="Enter")
        self.assertEqual(req.key, "Enter")


class TestTypeText(unittest.TestCase):
    def test_request_model(self):
        from type_text import Request
        req = Request(text="hello")
        self.assertEqual(req.text, "hello")
        self.assertTrue(req.use_react_trick)


class TestScroll(unittest.TestCase):
    def test_request_model(self):
        from scroll import Request
        req = Request(direction="down", amount=500)
        self.assertEqual(req.direction, "down")


class TestScreenshot(unittest.TestCase):
    def test_request_model(self):
        from screenshot import Request
        req = Request()


class TestGetInfo(unittest.TestCase):
    def test_request_model(self):
        from get_info import Request
        req = Request()


class TestEnsureBrowser(unittest.TestCase):
    def test_request_model(self):
        from ensure_browser import Request
        req = Request(with_proxy=False)
        self.assertFalse(req.with_proxy)


if __name__ == "__main__":
    unittest.main()
