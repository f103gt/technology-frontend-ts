import React, {useState} from 'react';
import CartModal from "../modals/CartModal";
import OrderData from "../modals/OrderData";

const CartOrderFormParent = () => {
    const [showCartModal, setShowCartModal] = useState(false);

    return (
        <div>
            <CartModal
                show={showCartModal}
                setShow={setShowCartModal}
            />
            <OrderData/>
        </div>
    );
};

export default CartOrderFormParent;
