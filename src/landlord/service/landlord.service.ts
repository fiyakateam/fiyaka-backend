import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLandlordDto } from '../dto/create-landlord.dto';
import { UpdateLandlordDto } from '../dto/update-landlord.dto';
import { ILandlord, Landlord } from '../model/landlord.model';
import * as sgMail from '@sendgrid/mail';
import { EmailReq } from '../dto/email.dto';
import env from '../../../config/env';
@Injectable()
export class LandlordService {
  constructor(
    @InjectModel(Landlord.name) private readonly landlordModel: Model<Landlord>
  ) {}

  public async create(
    createLandlordDto: CreateLandlordDto
  ): Promise<ILandlord> {
    const newLandlord = new this.landlordModel(createLandlordDto);
    return newLandlord.save();
  }

  public async findOne(id: string): Promise<Landlord> {
    const landlord = await this.landlordModel.findById({ _id: id });

    if (!landlord) {
      throw new NotFoundException(`Landlord #${id} not found`);
    }
    return landlord;
  }

  async findOneEmail(email: string): Promise<Landlord> {
    const landlord = await this.landlordModel.findOne({ email });
    return landlord;
  }

  update(id: string, updateLandlordDto: UpdateLandlordDto) {
    return `This action updates a #${id} landlord`;
  }

  public async remove(id: string) {
    const deletedLandlord = await this.landlordModel.findByIdAndRemove(id);
    return deletedLandlord;
  }

  async sendEmail(email: EmailReq): Promise<boolean> {
    try {
      await sgMail.send({
        to: email.to,
        from: env.emailSource,
        subject: email.subject,
        text: email.text,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
