import { Body, Patch, Post, Query, Route } from "tsoa";
import { ModelService } from "../services/modelService";
import { GenericRequest, TestClassModel, TestModel } from "../testModel";

@Route("PostTest")
export class PostTestController {
  @Post()
  public async postModel(@Body() model: TestModel): Promise<TestModel> {
    return model;
  }

  @Patch()
  public async updateModel(@Body() model: TestModel): Promise<TestModel> {
    return await new ModelService().getModel();
  }

  @Post("WithClassModel")
  public async postClassModel(
    @Body() model: TestClassModel
  ): Promise<TestClassModel> {
    const augmentedModel = new TestClassModel("test", "test2", "test3");
    augmentedModel.id = 700;

    return augmentedModel;
  }

  @Post("Location")
  public async postModelAtLocation(): Promise<TestModel> {
    return new ModelService().getModel();
  }

  @Post("Multi")
  public async postWithMultiReturn(): Promise<TestModel[]> {
    const model = new ModelService().getModel();

    return [model, model];
  }

  @Post("WithId/{id}")
  public async postWithId(id: number): Promise<TestModel> {
    return new ModelService().getModel();
  }

  @Post("WithBodyAndQueryParams")
  public async postWithBodyAndQueryParams(
    @Body() model: TestModel,
    @Query() query: string
  ): Promise<TestModel> {
    return new ModelService().getModel();
  }

  @Post("GenericBody")
  public async getGenericRequest(
    @Body() genericReq: GenericRequest<TestModel>
  ): Promise<TestModel> {
    return genericReq.value;
  }
}
