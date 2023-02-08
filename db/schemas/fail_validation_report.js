module.exports = function(e){
    let report = {}
    for (let key in e.errors){
        report[key] = e.errors[key].message;
    }
    return report;
}