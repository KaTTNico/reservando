/*CONSTRUCTOR*/
var Reserva = function(horario, cantidadPersonas, precioUnitario, codigoDescuento) {
  this.horario = horario
  this.cantidadPersonas = cantidadPersonas
  this.precioUnitario = precioUnitario
  this.codigoDescuento = codigoDescuento
}

/*COMPORTAMIENTOS*/
Reserva.prototype.calcularPrecioBase = function() {
  return this.precioUnitario * this.cantidadPersonas
}

Reserva.prototype.calcularPrecioTotal = function() {
  let precioBase = this.calcularPrecioBase()
  let adicionales = calcularAdicionales(this.horario, precioBase)
  let descuentos = calcularDescuentos(precioBase, this.cantidadPersonas, this.codigoDescuento)

  return precioBase + adicionales - descuentos
}

/*FUNCIONES*/
/*
  Descuentos:

  Descuento por grupos grandes: si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento. Para grupos entre de 7 y 8 personas un 10% de descuento y para grupos de más de 8 personas un 15% de descuento.
  Descuento por código: algunas reservas pueden tener un código de descuento asociado. Si no tienen ninguno, no se les otorga ningún descuento. Los códigos son:
  DES15: obtiene un 15% de descuento.
  DES200: obtiene $200 de descuento.
  DES1: obtiene de descuento el valor equivalente al precio de una persona.
*/
let calcularDescuentos = function(precioBase, cantidadPersonas, codigoDescuento) {
  //instanciar descuento total
  let totalDescuento = 0

  //agregar a total descuento por codigo
  totalDescuento += descuentoPorCodigo(codigoDescuento, precioBase)

  //agregar a total descuento por cantidad de cantidadPersonas
  totalDescuento += descuentoPorGrupos(cantidadPersonas, precioBase)

  //devolver totalDescuento
  return totalDescuento
}

let descuentoPorCodigo = function(codigoDescuento, precioBase) {
  let totalDescuento = 0

  //agregar a total desceunto por codigo
  switch (codigoDescuento) {
    case "DES15":
      totalDescuento += reglaDeTres(precioBase, 15)
      break

    case "DES200":
      totalDescuento += 200
      break

    case "DES1":
      totalDescuento += this.precioUnitario
      break

    default:
      break
  }

  return totalDescuento
}

//descuento por grupo de personas
let descuentoPorGrupos = function(cantidadPersonas, precioBase) {
  let totalDescuento = 0

  //agregar a total descuento por cantidad de cantidadPersonas
  if (cantidadPersonas >= 4 && cantidadPersonas <= 6)
    totalDescuento += reglaDeTres(precioBase, 5)

  else if (cantidadPersonas >= 7 && cantidadPersonas <= 8)
    totalDescuento += reglaDeTres(precioBase, 10)

  else if (cantidadPersonas > 8)
    totalDescuento += reglaDeTres(precioBase, 15)

  return totalDescuento
}

/*
  Adicionales:

  Adicional por horario: las franjas horarias de 13 a 14 y de 20 a 21 horas son muy concurridas.
  Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de esos rangos.

  Adicional por fin de semana: si la reserva fue realizada para alguno de los días del fin de semana (viernes, sábado o domingo) se le agrega un adicional del 10%.
*/
let calcularAdicionales = function(horario, precioBase) {
  let adicionales = 0

  adicionales += adicionalPorRangoHorario(horario, precioBase)
  adicionales += adicionalesPorFinSemana(precioBase)

  return adicionales
}

let adicionalPorRangoHorario = function(horario, precioBase) {
  let adicional = 0
  let hora = horario.getHours()

  if (hora >= 13 && hora <= 14 || hora >= 20 && hora <= 21)
    adicional += reglaDeTres(precioBase, 5)

  return adicional
}

let adicionalesPorFinSemana = function(precioBase) {
  let adicional = 0

  switch ((new Date(Date.now())).getDay()) {
    case 5:
    case 6:
    case 0:
      adicional += reglaDeTres(precioBase, 10)
      break

    default:
      break
  }

  return adicional
}

let reglaDeTres = (equivalenteCienPorciento, porcentajeX) => ((equivalenteCienPorciento * porcentajeX) / 100)
