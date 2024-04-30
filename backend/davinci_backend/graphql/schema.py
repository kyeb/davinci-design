import strawberry
from typing import List
from davinci_backend.file_utils import S3UploadUrl


@strawberry.type
class Book:
    title: str
    author: str


def get_books():
    return [
        Book(
            title="The Great Gatsby",
            author="F. Scott Fitzgerald",
        ),
    ]


@strawberry.type
class Query:
    books: List[Book] = strawberry.field(resolver=get_books)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_s3_upload_url(self, info: strawberry.Info) -> S3UploadUrl:
        return info.context.s3_client.generate_upload_url()


schema = strawberry.Schema(query=Query, mutation=Mutation)
