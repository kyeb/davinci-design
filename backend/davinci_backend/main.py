from fastapi import FastAPI, Depends
from davinci_backend.graphql.schema import schema
from strawberry.fastapi import GraphQLRouter, BaseContext
from davinci_backend.file_utils import S3Client


class ApplicationContext(BaseContext):
    def __init__(self):
        self.s3_client = S3Client()


async def get_context(
    custom_context=Depends(ApplicationContext),
):
    return custom_context


graphql_router = GraphQLRouter(
    schema,
    context_getter=get_context,
)


app = FastAPI()
app.include_router(graphql_router, prefix="/api/graphql")
