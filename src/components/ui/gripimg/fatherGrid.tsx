import Gridimg from "@/components/ui/gripimg/inicioGridImg";

const ParentComponent = () => {
    return (
        <div>
            <Gridimg
                leftImageUrl="/products/1473809-00-A_1_2000.jpg"
                topRightImageUrl="/products/1473819-00-A_alt.jpg"
                bottomRightImageUrl="/imgs/placeholder.jpg"
            />
        </div>
    );
}

export default ParentComponent;
