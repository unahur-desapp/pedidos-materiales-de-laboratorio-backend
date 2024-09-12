import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from 'src/schemas/requestable/equipment';


@Controller('/equipment')
export class EquipmentController {
    constructor(private EquipmentService: EquipmentService) {}

    @Post('/') 
    createEquipment(@Body() equipment: Equipment)
    {
        return this.EquipmentService.createEquipment(equipment);
    }

    @Get('/') 
    getAll()
    {
        return this.EquipmentService.getEquipments();
    }

    @Get('/:description') 
    GetEquipment(@Param('description') description: string)
    {
        return this.EquipmentService.getEquipment(description);
    }

    @Get('/:id') 
    GetEquipmentById(@Param('id') id: number)
    {
        return this.EquipmentService.getEquipoById(id);
    }

    @Delete('/:id') 
    DeleteEquipmentById(@Param('id') id: number)
    {
        return this.EquipmentService.deleteEquipoById(id);
    }

    @Put('/:id') 
    UpdateEquipmentById(@Param('id') id: number, @Body() equipment: Equipment)
    {
        return this.EquipmentService.updateEquipoById(id,equipment);
    }
}
