 export function toList(text){
    return text.split('\n').map(item => item.trim()).filter(item => item.length > 0);
 }