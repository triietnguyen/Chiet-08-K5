// cc.Class({
//     name: 'Item',
//     properties: {
//         name: '',
//         quantity: 0,
//         type: '',
//         effect: ''
//     },

//     ctor(name, quantity, type, effect) {
//         this.name = name;
//         this.quantity = quantity;
//         this.type = type;
//         this.effect = effect;
//     },

//     use() {
//         if (this.type === 'consumable') {
//             this.quantity -= 1;
//             if (this.quantity <= 0) {
//                 return true;
//             }
//         } else if (this.type === 'equipment') {
//             return true; 
//         }
//         return false;
//     },

//     delete() {
//         return true; 
//     }
// });
