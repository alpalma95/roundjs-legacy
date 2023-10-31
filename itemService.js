import { Stream } from "./src";

class ItemService {
    constructor() {
        this.items = new Stream([{
            id: 1,
            text: "Some text",
          }, {
            id: 2,
            text: "Some text",
          }])
        
        this.currentItem = new Stream("")
    }

    addItem(item) {
        const newItem = {
            id: item.id,
            text: item.text,
          };
        this.items.value = [...this.items.value, newItem]
    }

    removeItem({id}) {
        this.items.value = [...this.items.value.filter(item => item.id !== id)]
    }
    editItem(c) {
      this.currentItem.value = c
    }
}

export const itemService = new ItemService();