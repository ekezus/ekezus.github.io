
const cashRegister = {
    data() {
        return {
            price: 0,
            discount: 0,
            menu: [
                { id: 1, name: 'Heartstopper', img: 'hamburger', price: 800, quantity: 0 },
                { id: 2, name: 'Veggieburger', img: 'vege', price: 700, quantity: 0 },
                { id: 3, name: 'Chicken burger', img: 'chicken', price: 1500, quantity: 0 },
                { id: 4, name: 'Burger BS', img: 'cheeseburger', price: 400, quantity: 0 },
                { id: 5, name: 'Shake czekoladowy', img: 'shakec', price: 1500, quantity: 0 },
                { id: 6, name: 'Shake truskawkowy', img: 'shakesb', price: 200, quantity: 0 },
                { id: 7, name: 'Frytki', img: 'chips', price: 100, quantity: 0 },
                { id: 8, name: 'Le Grinder', img: 'set', price: 6000, quantity: 0 },
                { id: 9, name: 'Tomorrow Pack', img: 'set', price: 3600, quantity: 0 },
                { id: 10, name: 'Pacyfic Beach', img: 'set', price: 3600, quantity: 0 },
                { id: 11, name: 'Agonia', img: 'set', price: 3000, quantity: 0 },
            ]
        }
    },
    methods: {
        save() {
            if(this.price > 0){
                this.price = 0;
                this.menu.forEach(el => el.quantity = 0);
            }
        },
        copy() {
            navigator.clipboard.writeText(this.price);
        },
        add(id) {
            let obj = this.menu.find(el => el.id == id);
            obj.quantity++;
            (this.price <= 0) ? this.price = obj.price : this.price += obj.price;
        },
        remove(id) {
            let obj = this.menu.find(el => el.id == id);
            obj.quantity--;
            (this.price-obj.price <= 0) ? this.price = 0 : this.price -= obj.price;
        },
        addDiscount(val) {
            this.discount = val;
        },
        addPrice(event) {
            (parseFloat(event.target.value) < 0 || isNaN(parseFloat(event.target.value))) ? 
            this.price = 0: 
            this.price = parseFloat(event.target.value);
        }
    },
    computed: {
        getOrder() {
            return this.menu.filter(menu => menu.quantity > 0);
        },
        getPrice() {
            if(this.discount===0) {
                return this.price;
            } else {
                return this.price - (this.price * this.discount/100);
            }
        }
    },
    template: `
        <div class="cash-left">
            <div class="discount">
                Rabat:
                <span class="discount-btn" :class="{'discount-btn-acive': discount == 0}" @click="addDiscount(0)">0%</span>
                <span class="discount-btn" :class="{'discount-btn-acive': discount == 25}" @click="addDiscount(25)">25%</span>
                <span class="discount-btn" :class="{'discount-btn-acive': discount == 50}" @click="addDiscount(50)">50%</span>
            </div>
            <div class="order-contener ">
                <div v-for="order in getOrder" class="flex order" @click="remove(order.id)">
                    <div class="flex order-title">
                        <img :src="'./img/'+order.img+'.png'">{{order.name}}
                    </div>
                    <div class="order-quantity">
                        x{{order.quantity}}
                    </div>
                </div>
            </div>

        </div>
        <div class="cash-right">
            <div class="flex top-bar">
                <input type="number" @input.number="addPrice" :value="getPrice">
                <div class="copy" @click="copy"></div>
                <div class="btn" @click="save" :class="{'btn-disabled': price == 0}">Wystaw</div>
            </div>
            <div class="flex product-list">
                <product v-for="item in menu"  @click="add(item.id)" :img="item.img" :name="item.name" :price="item.price">
                </product>
            </div>
        </div>
    `
}


const app = Vue.createApp(cashRegister);
app.component('product', {
    props: ['img', 'name', 'price'],
    data() {
        return {
            hover: false
        }
    },
    template: `
        <div class="product" @mouseover.native="hover = true" @mouseleave.native="hover = false">
            <div class="tool-tip" :class="{active: hover}">{{name}}</div>
            <img :src="'./img/'+img+'.png'" :title="name"><br>
            {{price}}
        </div>`
});

app.mount('#app');