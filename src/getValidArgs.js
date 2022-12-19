const getValidArgs = (string) => {
    
    const result = [];
    const control = [];
        let arg = '';
        string.split('').forEach((item, index) => {
            if (item !== ' ') {
                if (item === '"') {
                    if (control.length === 0) {
                        control.push(item)
                    } else {
                        control.pop()
                    }

                } else {
                    arg += item;
                }
  
            } else {
                if(control.length === 0) {
                    result.push(arg);
                    arg = '';
                } else {
                    arg += item;
                }
            }
            if (index === string.split('').length - 1) {
                result.push(arg)
            }
           
        });

    return result.filter(item => item !== '');
}

export default getValidArgs