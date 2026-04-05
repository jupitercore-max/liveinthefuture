from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    # TODO: replace me
    dummy: str = "TODO: replace me"


class Response(BaseModel):
    # TODO: replace me
    dummy: str


async def main(ctx, request: Request) -> Response:
    # TODO: implement me
    return Response(dummy=request.dummy)


if __name__ == "__main__":
    raise SystemExit(run_action(main))
