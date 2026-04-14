"""Smoke tests for Remote Browser CDP actions."""

import unittest
import json
import urllib.request


CDP_PORT = 9224


def chrome_is_running() -> bool:
    try:
        resp = urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json/version", timeout=3)
        data = json.loads(resp.read())
        return "Browser" in data
    except Exception:
        return False


@unittest.skipUnless(chrome_is_running(), "Chrome not running on port 9224")
class TestCDPActions(unittest.TestCase):

    def test_screenshot_returns_base64(self):
        """Screenshot action returns base64 JPEG data."""
        import asyncio
        from screenshot import main, Request, Response

        class FakeCtx:
            def app_db_path(self):
                return "/tmp/test.db"
        
        result = asyncio.run(main(FakeCtx(), Request()))
        self.assertIsInstance(result, Response)
        self.assertTrue(result.ok, f"Screenshot failed: {result.error}")
        self.assertGreater(len(result.image_base64), 1000, "Base64 image too small")

    def test_click_dispatches(self):
        """Click action dispatches mouse events without error."""
        import asyncio
        from click import main, Request, Response

        class FakeCtx:
            def app_db_path(self):
                return "/tmp/test.db"

        result = asyncio.run(main(FakeCtx(), Request(x=640, y=360)))
        self.assertIsInstance(result, Response)
        self.assertTrue(result.ok, f"Click failed: {result.error}")

    def test_scroll_dispatches(self):
        """Scroll action dispatches mouseWheel without error."""
        import asyncio
        from scroll import main, Request, Response

        class FakeCtx:
            def app_db_path(self):
                return "/tmp/test.db"

        result = asyncio.run(main(FakeCtx(), Request(direction="down", amount=200)))
        self.assertIsInstance(result, Response)
        self.assertTrue(result.ok, f"Scroll failed: {result.error}")

    def test_press_key_enter(self):
        """Press key action handles Enter key."""
        import asyncio
        from press_key import main, Request, Response

        class FakeCtx:
            def app_db_path(self):
                return "/tmp/test.db"

        result = asyncio.run(main(FakeCtx(), Request(key="Enter")))
        self.assertIsInstance(result, Response)
        self.assertTrue(result.ok, f"Press key failed: {result.error}")

    def test_press_key_unknown(self):
        """Press key returns error for unknown key."""
        import asyncio
        from press_key import main, Request, Response

        class FakeCtx:
            def app_db_path(self):
                return "/tmp/test.db"

        result = asyncio.run(main(FakeCtx(), Request(key="FakeKey")))
        self.assertIsInstance(result, Response)
        self.assertFalse(result.ok)
        self.assertIn("Unknown key", result.error)


if __name__ == "__main__":
    unittest.main()
