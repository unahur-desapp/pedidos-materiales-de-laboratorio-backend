import { HttpStatus, Injectable } from '@nestjs/common';
import { Reactive } from '../schemas/requestable/reactive';
import handlePromise from '../utils/promise';
import { BackendException } from '../shared/backend.exception';
import { Model, Types } from 'mongoose';
import { ReactiveController } from './reactive.controller';
import { ReactiveModule } from './reactive.module';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ReactiveService {
  constructor( 
    @InjectModel(Reactive.name)
    private ReactiveModel: Model<Reactive>
  ) { }

  async createReactive(Reactive: Reactive): Promise<Reactive> {
    return this.ReactiveModel.create(Reactive);
  }

  async getReactive(description: string): Promise<Reactive[]> {
    const [Reactives, err] = await handlePromise(
      this.ReactiveModel.find({
        $and: [
          { $or:[  
                    {description: { $regex: description, $options: "i" }},
                    {cas: { $regex: description, $options: "i" }}
          ] },
          { available: true }
        ],
      }).sort({ type: 'asc', description: 'asc' })
    );

    if (err) {
      throw new BackendException(
        `Cannot get Reactive ${description}. Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


    return Reactives;
  }

  async getReactives(): Promise<Reactive[]> {
    const [Reactives, err] = await handlePromise(
      this.ReactiveModel.find(
        { available: true })
    );

    if (err) {
      throw new BackendException(
        `Cannot get Reactives Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return Reactives;
  }
 async getReactiveById(id: Types.ObjectId): Promise<Reactive> {
    const [Reactive, err] = await handlePromise(
      this.ReactiveModel.findById(id)
    );
    if (err) {
      throw new BackendException(
        `Cannot get Reactive ${id}. Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return Reactive;
  }



  async updateReactiveById(id: Types.ObjectId, Reactive: Reactive): Promise<Reactive> {
    const [result, err] = await handlePromise(
      this.ReactiveModel.updateOne({ _id: id }, Reactive, { new: true })
    );
    if (err) {
      throw new BackendException(
        `Cannot get Reactive ${id}. Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return Reactive; // TODO: Check how return the updated Reactive with the last changes
  }



  async deleteReactiveById(id: Types.ObjectId): Promise<String> {
    const [Reactive, err] = await handlePromise(
      this.ReactiveModel.findByIdAndDelete(id)
    );
    if (err) {
      throw new BackendException(
        `Cannot get Reactive ${id}. Reason: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
    return `Reactive with description ${Reactive.description} and id ${Reactive.id} was deleted successfully`;
  }


}