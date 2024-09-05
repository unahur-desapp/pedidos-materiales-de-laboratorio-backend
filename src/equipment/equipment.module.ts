import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment ,EquipmentSchema } from 'src/schemas/requestable/equipment';


@Module({
    imports:[    
        
        MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }]),
    ],
    controllers: [EquipmentController,
    ],
    providers: [EquipmentService],
})
export class EquipmentModule {};