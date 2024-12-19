import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Cliente } from '../models/cliente';
import { Proveedor } from '../models/proveedor';
import { Laboratorio } from '../models/laboratorio';
import { Empleado } from '../models/empleado';
import { Almacen } from '../models/almacen';
// import { Medicamento } from '../models/medicamento';
import { Venta } from '../models/venta';
import { Factura } from '../models/factura';
import { DetalleVenta } from '../models/detalleventa';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private  _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();

  private _findUserByIdEventEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  private _errorsUserFormEventEmitter = new EventEmitter();

  private _pageUsersEventEmitter = new EventEmitter();

  private _handlerLoginEventEmitter = new EventEmitter();



  private  _newClienteEventEmitter: EventEmitter<Cliente> = new EventEmitter();

  private _idClienteEventEmitter = new EventEmitter;

  private _findClienteByIdEventEmitter = new EventEmitter();

  private _selectClienteEventEmitter = new EventEmitter();

  private _errorsClienteFormEventEmitter = new EventEmitter();

  private _pageClientesEventEmitter = new EventEmitter();




  private  _newProveedorEventEmitter: EventEmitter<Proveedor> = new EventEmitter();

  private _idProveedorEventEmitter = new EventEmitter;

  private _findProveedorByIdEventEmitter = new EventEmitter();

  private _selectProveedorEventEmitter = new EventEmitter();

  private _errorsProveedorFormEventEmitter = new EventEmitter();

  private _pageProveedoresEventEmitter = new EventEmitter();




  private  _newLaboratorioEventEmitter: EventEmitter<Laboratorio> = new EventEmitter();

  private _idLaboratorioEventEmitter = new EventEmitter;

  private _findLaboratorioByIdEventEmitter = new EventEmitter();

  private _selectLaboratorioEventEmitter = new EventEmitter();

  private _errorsLaboratorioFormEventEmitter = new EventEmitter();

  private _pageLaboratoriosEventEmitter = new EventEmitter();




  private  _newEmpleadoEventEmitter: EventEmitter<Empleado> = new EventEmitter();

  private _idEmpleadoEventEmitter = new EventEmitter;

  private _findEmpleadoByIdEventEmitter = new EventEmitter();

  private _selectEmpleadoEventEmitter = new EventEmitter();

  private _errorsEmpleadoFormEventEmitter = new EventEmitter();

  private _pageEmpleadosEventEmitter = new EventEmitter();




  private  _newAlmacenEventEmitter: EventEmitter<Almacen> = new EventEmitter();

  private _idAlmacenEventEmitter = new EventEmitter;

  private _findAlmacenByIdEventEmitter = new EventEmitter();

  private _selectAlmacenEventEmitter = new EventEmitter();

  private _errorsAlmacenFormEventEmitter = new EventEmitter();

  private _pageAlmacenesEventEmitter = new EventEmitter();



  private  _newMedicamentoEventEmitter: EventEmitter<any> = new EventEmitter();

  private _idMedicamentoEventEmitter = new EventEmitter;

  private _findMedicamentoByIdEventEmitter = new EventEmitter();

  private _selectMedicamentoEventEmitter = new EventEmitter();

  private _errorsMedicamentoFormEventEmitter = new EventEmitter();

  private _pageMedicamentosEventEmitter = new EventEmitter();






  private  _newVentaEventEmitter: EventEmitter<Venta> = new EventEmitter();

  private _idVentaEventEmitter = new EventEmitter;

  private _findVentaByIdEventEmitter = new EventEmitter();

  private _selectVentaEventEmitter = new EventEmitter();

  private _errorsVentaFormEventEmitter = new EventEmitter();

  private _pageVentasEventEmitter = new EventEmitter();



  private  _newDetalleVentaEventEmitter: EventEmitter<DetalleVenta> = new EventEmitter();

  private _idDetalleVentaEventEmitter = new EventEmitter;

  private _findDetalleVentaByIdEventEmitter = new EventEmitter();

  private _selectDetalleVentaEventEmitter = new EventEmitter();

  private _errorsDetalleVentaFormEventEmitter = new EventEmitter();

  private _pageDetalleVentasEventEmitter = new EventEmitter();



  private  _newCompraEventEmitter: EventEmitter<Compra> = new EventEmitter();

  private _idCompraEventEmitter = new EventEmitter;

  private _findCompraByIdEventEmitter = new EventEmitter();

  private _selectCompraEventEmitter = new EventEmitter();

  private _errorsCompraFormEventEmitter = new EventEmitter();

  private _pageComprasEventEmitter = new EventEmitter();






  constructor() { }

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }
  get pageUsersEventEmitter() {
    return this._pageUsersEventEmitter;
  }
  get errorsUserFormEventEmitter() {
    return this._errorsUserFormEventEmitter;
  }

  get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }

  get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter
  }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }




  get newClienteEventEmitter(): EventEmitter<Cliente> {
    return this._newClienteEventEmitter;
  }

  get pageClientesEventEmitter() {
    return this._pageClientesEventEmitter;
  }
  get errorsClienteFormEventEmitter() {
    return this._errorsClienteFormEventEmitter;
  }

  get selectClienteEventEmitter() {
    return this._selectClienteEventEmitter;
  }

  get findClienteByIdEventEmitter() {
    return this._findClienteByIdEventEmitter
  }

  get idClienteEventEmitter(): EventEmitter<number>{
    return this._idClienteEventEmitter;
  }





  get newProveedorEventEmitter(): EventEmitter<Proveedor> {
    return this._newProveedorEventEmitter;
  }

  get pageProveedoresEventEmitter() {
    return this._pageProveedoresEventEmitter;
  }
  get errorsProveedorFormEventEmitter() {
    return this._errorsProveedorFormEventEmitter;
  }

  get selectProveedorEventEmitter() {
    return this._selectProveedorEventEmitter;
  }

  get findProveedorByIdEventEmitter() {
    return this._findProveedorByIdEventEmitter
  }

  get idProveedorEventEmitter(): EventEmitter<number>{
    return this._idProveedorEventEmitter;
  }



  get newEmpleadoEventEmitter(): EventEmitter<Empleado> {
    return this._newEmpleadoEventEmitter;
  }

  get pageEmpleadosEventEmitter() {
    return this._pageEmpleadosEventEmitter;
  }
  get errorsEmpleadoFormEventEmitter() {
    return this._errorsEmpleadoFormEventEmitter;
  }

  get selectEmpleadoEventEmitter() {
    return this._selectEmpleadoEventEmitter;
  }

  get findEmpleadoByIdEventEmitter() {
    return this._findEmpleadoByIdEventEmitter
  }

  get idEmpleadoEventEmitter(): EventEmitter<number>{
    return this._idEmpleadoEventEmitter;
  }




  get newLaboratorioEventEmitter(): EventEmitter<Laboratorio> {
    return this._newLaboratorioEventEmitter;
  }

  get pageLaboratoriosEventEmitter() {
    return this._pageLaboratoriosEventEmitter;
  }
  get errorsLaboratorioFormEventEmitter() {
    return this._errorsLaboratorioFormEventEmitter;
  }

  get selectLaboratorioEventEmitter() {
    return this._selectLaboratorioEventEmitter;
  }

  get findLaboratorioByIdEventEmitter() {
    return this._findLaboratorioByIdEventEmitter
  }

  get idLaboratorioEventEmitter(): EventEmitter<number>{
    return this._idLaboratorioEventEmitter;
  }




  get newAlmacenEventEmitter(): EventEmitter<Almacen> {
    return this._newAlmacenEventEmitter;
  }

  get pageAlmacenesEventEmitter() {
    return this._pageAlmacenesEventEmitter;
  }
  get errorsAlmacenFormEventEmitter() {
    return this._errorsAlmacenFormEventEmitter;
  }

  get selectAlmacenEventEmitter() {
    return this._selectAlmacenEventEmitter;
  }

  get findAlmacenByIdEventEmitter() {
    return this._findAlmacenByIdEventEmitter
  }

  get idAlmacenEventEmitter(): EventEmitter<number>{
    return this._idAlmacenEventEmitter;
  }







  get newMedicamentoEventEmitter(): EventEmitter<any> {
    return this._newMedicamentoEventEmitter;
  }

  get pageMedicamentosEventEmitter() {
    return this._pageMedicamentosEventEmitter;
  }
  get errorsMedicamentoFormEventEmitter() {
    return this._errorsMedicamentoFormEventEmitter;
  }

  get selectMedicamentoEventEmitter() {
    return this._selectMedicamentoEventEmitter;
  }

  get findMedicamentoByIdEventEmitter() {
    return this._findMedicamentoByIdEventEmitter
  }

  get idMedicamentoEventEmitter(): EventEmitter<number>{
    return this._idMedicamentoEventEmitter;
  }





  get newVentaEventEmitter(): EventEmitter<any> {
    return this._newVentaEventEmitter;
  }

  get pageVentasEventEmitter() {
    return this._pageVentasEventEmitter;
  }
  get errorsVentaFormEventEmitter() {
    return this._errorsVentaFormEventEmitter;
  }

  get selectVentaEventEmitter() {
    return this._selectVentaEventEmitter;
  }

  get findVentaByIdEventEmitter() {
    return this._findVentaByIdEventEmitter
  }

  get idVentaEventEmitter(): EventEmitter<number>{
    return this._idVentaEventEmitter;
  }




  get newDetalleVentaEventEmitter(): EventEmitter<DetalleVenta> {
    return this._newDetalleVentaEventEmitter;
  }

  get pageDetalleVentasEventEmitter() {
    return this._pageDetalleVentasEventEmitter;
  }
  get errorsDetalleVentaFormEventEmitter() {
    return this._errorsDetalleVentaFormEventEmitter;
  }

  get selectDetalleVentaEventEmitter() {
    return this._selectDetalleVentaEventEmitter;
  }

  get findDetalleVentaByIdEventEmitter() {
    return this._findDetalleVentaByIdEventEmitter
  }

  get idDetalleVentaEventEmitter(): EventEmitter<number>{
    return this._idDetalleVentaEventEmitter;
  }






  get newCompraEventEmitter(): EventEmitter<any> {
    return this._newCompraEventEmitter;
  }

  get pageComprasEventEmitter() {
    return this._pageComprasEventEmitter;
  }
  get errorsCompraFormEventEmitter() {
    return this._errorsCompraFormEventEmitter;
  }

  get selectCompraEventEmitter() {
    return this._selectCompraEventEmitter;
  }

  get findCompraByIdEventEmitter() {
    return this._findCompraByIdEventEmitter
  }

  get idCompraEventEmitter(): EventEmitter<number>{
    return this._idCompraEventEmitter;
  }


}
