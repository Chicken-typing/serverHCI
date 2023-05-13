const sumCalculate = (array) => {
    var sum = 0
    array.forEach(element => {
        sum+=element.rating
    });
    return sum
}
export default sumCalculate