import strawberry
from typing import List
from davinci_backend.db import ProjectModel, generate_id
from davinci_backend.file_utils import S3UploadUrl


@strawberry.type
class Project:
    id: str
    name: str


@strawberry.type
class Query:
    @strawberry.field
    def projects(self, info: strawberry.Info) -> List[Project]:
        print("resolving projects")
        db = info.context.db
        return [
            Project(id=project.id, name=project.name)
            for project in db.query(ProjectModel).all()
        ]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_s3_upload_url(self, info: strawberry.Info) -> S3UploadUrl:
        return info.context.s3_client.generate_upload_url()

    @strawberry.mutation
    def create_project(self, info: strawberry.Info, name: str) -> Project:
        db = info.context.db
        model = ProjectModel(name=name, id=generate_id("proj"))
        db.add(model)
        db.commit()
        return Project(id=model.id, name=model.name)


schema = strawberry.Schema(query=Query, mutation=Mutation)
