'use strict'

$(document).ready(() => {
console.log('im listening');



  $('#score_form').keyup(() => {
    let score1 = parseInt($('#score1').val())
    console.log(score1)
    let score2 = parseInt($('#score2').val())
    console.log(score2)
    let score3 = parseInt($('#score3').val())
    console.log(score3)
    let score4 = parseInt($('#score4').val())
    console.log(score4)


    let total = 0
    total += score1
    total += score2
    total += score3
    total += score4
    console.log(total);
    $('#total').text(total)
  })


$('#score_form2').keyup(() => {
  let score5 = parseInt($('#score5').val())
  console.log(score5)
  let score6 = parseInt($('#score6').val())
  console.log(score6)
  let score7 = parseInt($('#score7').val())
  console.log(score7)
  let score8 = parseInt($('#score8').val())
  console.log(score8)

  let total2 = 0
  total2 += score5
  total2 += score6
  total2 += score7
  total2 += score8
  console.log(total2);
  $('#total2').text(total2)
})


})
