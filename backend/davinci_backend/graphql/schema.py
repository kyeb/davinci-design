import strawberry
from typing import List
from davinci_backend.db import ProjectModel, generate_id
from davinci_backend.file_utils import S3UploadUrl


@strawberry.type
class Project:
    id: strawberry.ID
    name: str


@strawberry.type
class Model:
    id: strawberry.ID
    url: str


@strawberry.type
class Query:
    @strawberry.field
    def projects(self, info: strawberry.Info) -> List[Project]:
        db = info.context.db
        return [
            Project(id=project.id, name=project.name)
            for project in db.query(ProjectModel).all()
        ]

    @strawberry.field
    def project(self, info: strawberry.Info, id: strawberry.ID) -> Project:
        db = info.context.db
        project = db.query(ProjectModel).get(id)
        return Project(id=project.id, name=project.name) if project else None


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

    @strawberry.mutation
    def generate_model_from_image(self, info: strawberry.Info, s3_key: str) -> Model:
        # TODO: do the thing
        return Model(
            id=generate_id("model"),
            url="https://www.ozeki.hu/attachments/116/Menger_sponge_sample.stl",
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
