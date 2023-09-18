function convertDate(date){
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      timeZoneName: 'short' 
    };
    const dateObj = new Date(date)
  
    const formatedDate=dateObj.toLocaleDateString(undefined,options)
    return formatedDate
  
  }

  export default convertDate