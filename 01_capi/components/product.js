export const product = {
  template: `
    <p>
      <strong>{{ name }}</strong> - {{ price }}
    </p>
    <button @click="addToCart" class="default-btn mt-2">Add to Cart</button>
    
  `,

  props: {
    name: String,
    price: Number,
  },
  setup(props, { emit }) {
    const addToCart = () => emit("addToCart", props.name);
    console.log(props.name);
    console.log(props.price);
    return { addToCart };
  },
};
