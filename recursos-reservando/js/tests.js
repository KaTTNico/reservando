var expect = chai.expect

/*TESTS RESTAURANT*/
describe('reservar un horario', function() {
  //este es un restaurant robado del archivo listado.js
  let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])

  it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function() {
    //reservar horario
    restaurant.reservarHorario("13:00")

    expect(restaurant.horarios).not.have.members(['13:00'])
  })

  it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function() {
    //obtener la cantidad de horarios actual.
    let cantidadHorarios = restaurant.horarios.lenght
    //se reserva un horario que el restaurant no posee.
    restaurant.reservarHorario("14:00")

    expect(restaurant.horarios.lenght).to.be.equal(cantidadHorarios)
  })

  it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function() {
    //obtener la cantidad de horarios actual.
    let cantidadHorarios = restaurant.horarios.lenght
    //se llama a la funcion reservarHorario pero no se le pasa ningun parametro
    restaurant.reservarHorario()

    expect(restaurant.horarios.lenght).to.be.equal(cantidadHorarios)
  })
})

describe('Obtener una puntuacion', function() {
  it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', function() {
    //este es un restaurant robado del archivo listado.js
    let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
    //obtener puntuacion
    let puntuacion = restaurant.obtenerPuntuacion();

    /*[6, 7, 9, 10, 5] el resultado del promedio de estas puntuaciones es 7.4*/
    expect(puntuacion).to.be.equal(7.4)
  })

  it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.', function() {
    //este es un restaurant robado del achivo listado.js pero sin calificar
    let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [])
    //obtener puntuacione
    let puntuacion = restaurant.obtenerPuntuacion();

    expect(puntuacion).to.be.equal(0)
  })
})

describe('Agregar una nueva calificacion', function() {
  //este es un restaurant robado del archivo listado.js
  let restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])

  it('Dado un restaurant, al darle una calificacion, esta debe formar parte de las calificaciones del mismo.', function() {
    //calificar con una calificacion que no tenia
    restaurant.calificar(8)

    expect(restaurant.calificaciones).to.include.members([8])
  })

  it('Dado un restaurant, al llamar al metodo calificar y no pasarle nada no deberian cambiar las calificaciones del mismo', function() {
    //get calificaciones
    let calificaciones = restaurant.calificaciones

    //calificar vacio
    restaurant.calificar()

    expect(restaurant.calificaciones).to.have.equal(calificaciones)
  })
})

/*TESTS LISTADO*/

describe('Buscar un restaurant', function() {
  it('Dada una lista de restaurantes, al buscar un restaurant existente debe devolverme el mismo.', function() {
    expect(listado.restaurantes.find(restaurant => restaurant.id == 1)).to.be.eql(listado.buscarRestaurante(1))
  })

  it('Dada una lista de restaurantes, al buscar un id que no existe no me debe devolver ningun restaurant.', function() {
    expect(listado.buscarRestaurante(0)).to.be.equal('No se ha encontrado ningún restaurant')
  })

  it('Dada una lista de restaurantes, al no pasarle nada por parametro a buscarRestaurante no me debe devolver ningun restaurant.', function() {
    expect(listado.buscarRestaurante()).to.be.equal('No se ha encontrado ningún restaurant')
  })

})

describe('Obtener restaurantes', function() {
  var filtroRubro = ""
  var filtroCiudad = ""
  var filtroHorario = ""

  afterEach(function() {
    if (filtroRubro !== null && filtroCiudad !== null && filtroHorario !== null) {
      expect(listado.restaurantes.filter(restaurant => (
        restaurant.rubro == filtroRubro &&
        restaurant.ubicacion == filtroCiudad &&
        (restaurant.horarios.some(horario => horario == filtroHorario))
      ))).to.be.eql(listado.obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario))
    } else
      expect(listado.restaurantes).to.be.eql(listado.obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario))
  });

  it('Dada una lista de restaurantes, al filtrar los restaurantes deberia devolverme todos los restaurantes.', function() {
    filtroRubro = "Desayuno"
    filtroCiudad = "Nueva York"
    filtroHorario = "15:00"
  })

  it('Dada una lista de restaurantes, al filtrar los restaurantes con los filtros vacios a menos que existan restaurantes con estas atributos vacios (en este caso no hay)', function() {
    filtroRubro = ""
    filtroCiudad = ""
    filtroHorario = ""
  })

  it('Dada una lista de restaurantes, al filtrar los restaurantes con los filtros null me debe devolver todos los restaurantes.', function() {
    filtroRubro = null
    filtroCiudad = null
    filtroHorario = null
  })
})

/*TEST RESERVA*/
describe('Calcular precio base de una reserva', function() {
  //crear una reserva
  let reserva = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")

  //calcular precio base
  it('Dada una reserva se debe calcular el precio base',function(){
    expect(reserva.calcularPrecioBase()).to.be.equal(2800)
  })
})

describe('Calcular precio total de una reserva',function(){
  //crear una reserva
  let reserva = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")

  //calcular precio total
  it('Dada una reserva se debe calcular su precio total',function(){
    expect(reserva.calcularPrecioTotal()).to.be.equal(100)
  })
})
