import { Module } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Equipment } from '../schemas/requestable/equipment';
import { Model } from 'mongoose';
import handlePromise from '../utils/promise';
import { BackendException } from '../shared/backend.exception';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';


@Module({
    controllers: [EquipmentController],
    providers: [EquipmentService],
})
export class EquipmentModule {
    static getEquipments() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectModel(Equipment.name) private equipmentModel: Model<Equipment>) { }

    async createEquipment(equipment: Equipment): Promise<Equipment> {
      return this.equipmentModel.create(equipment);
    }
  
    async getEquipment(description: string): Promise<Equipment[]> {
      const [equipments, err] = await handlePromise(
        this.equipmentModel.find({
          $and: [
            { description: { $regex: description, $options: "i" } },
            { available: true }
          ],
        }).sort({ type: 'asc', description: 'asc' })
      );
  
      if (err) {
        throw new BackendException(
          `Cannot get equipment ${description}. Reason: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  
      return equipments;
    }
  
    async getEquipments(description: string): Promise<Equipment[]> {
      const [equipments, err] = await handlePromise(
        this.equipmentModel.find(
          { available: true })
      );
  
      if (err) {
        throw new BackendException(
          `Cannot get equipments Reason: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  
      return equipments;
    }
  
    async getEquipmentById(id: Number): Promise<Equipment> {
      const [equipment, err] = await handlePromise(
        this.equipmentModel.findById(id)
      );
      if (err) {
        throw new BackendException(
          `Cannot get equipment ${id}. Reason: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  
      return equipment;
    }
  
    async updateEquipmentById(id: Number, equipment: Equipment): Promise<Equipment> {
      const [result, err] = await handlePromise(
        this.equipmentModel.updateOne({ _id: id }, equipment, { new: true })
      );
      if (err) {
        throw new BackendException(
          `Cannot get equipment ${id}. Reason: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return equipment; // TODO: Check how return the updated equipment with the last changes
    }
  
    async deleteEquipmentById(id: Number): Promise<String> {
      const [equipment, err] = await handlePromise(
        this.equipmentModel.findByIdAndDelete(id)
      );
      if (err) {
        throw new BackendException(
          `Cannot get equipment ${id}. Reason: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return `Equipment with description ${equipment.description} and id ${equipment.id} was deleted successfully`;
    }
  
};