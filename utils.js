// tis tunction return the age of a person in years
function calculateAge(dateOfBirth) {
    var dateOfBirth = new Date(dateOfBirth);
    var todaysDate = new Date();
    
    var years = todaysDate.getFullYear() - dateOfBirth.getFullYear();
    var months = (todaysDate.getMonth() - dateOfBirth.getMonth());

    return ( (months < 0) || (months == 0 && (todaysDate.getDay() - dateOfBirth.getDay()) < 0) ) ? --years : years;
}

//this function returns an specific cookie
function getCookie(cookie) {
    var b = document.cookie.match('(^|;)\\s*' + cookie + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : null;
}

// this function return true if date is in the future
function futureDate(date) {
    return ( new Date(date) > new Date() ) ? true : false ;
}

// this function return true if date is in the past
function pastDate(date) {
    //hugo's way
    return ( new Date(date) < new Date() ) ? true : false ;
}


function isEmptyObj(obj) {

    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}