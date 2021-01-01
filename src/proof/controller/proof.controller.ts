import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProofService } from '../service/proof.service';
import { ProofPutReq, ProofPutRes } from '../dto/proof-put.dto';
import { ProofApiPath } from '../constant/api-path';
import { ApiTags } from '@nestjs/swagger';
import { ProofPostReq, ProofPostRes } from '../dto/proof-post.dto';
import { ProofGetRes } from '../dto/proof-get.dto';

@ApiTags(ProofApiPath.root)
@Controller(ProofApiPath.root)
export class ProofController {
  constructor(private readonly proofService: ProofService) {}

  @Post()
  create(@Body() req: ProofPostReq): ProofPostRes {
    return this.proofService.create(req);
  }

  @Get()
  findAll(): Array<ProofGetRes> {
    return this.proofService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ProofGetRes {
    return this.proofService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() req: ProofPutReq): ProofPutRes {
    return this.proofService.update(+id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.proofService.remove(+id);
  }
}
