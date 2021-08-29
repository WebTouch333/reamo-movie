import { IcartObjType } from '../CarContainer/carContainer';
import { Arrow, Inline, Button, Text, Spacer } from 'vcc-ui';
import React from "react";
export interface cartObjTypeInterface {
  cardData: IcartObjType;
  learn: (id: string) => void;
  shop: (id: string) => void;
}

const CarItem: React.FC<cartObjTypeInterface> = ({ cardData, learn, shop }) => (
  <div style={{ padding: "0 15px" }}>
    <Text extend={{ textAlign: 'start' }} >{cardData.bodyType}</Text>
    <Inline extend={{ textAlign: 'start' }}>
      <Text subStyle="emphasis" >
        {cardData.modelName}
        <Text variant="bates" >
          {
            `  ${cardData.modelType}`
          }
        </Text>
      </Text>
    </Inline >
    <img style={{ width: "100%" }} src={cardData.imageUrl} alt={cardData.modelName} />
    <Spacer />
    {/* <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap'
    }}>
      <Link href="https://www.volvocars.com/" style={{padding:"5px"}} arrow="right">
        Learn
      </Link>
      <Link href="https://www.volvocars.com/" style={{padding:"5px"}} arrow="right">
        Shop
      </Link>
    </div> */}
    <div style={{display:"flex"}}>
      <Button aria-label="Learn"  variant="text" onClick={() => learn(cardData.id)}>
        Learn <Arrow size={10} />
      </Button>
      <Button aria-label="Shop"  variant="text" onClick={() => shop(cardData.id)} >
        Shop <Arrow size={10} />
      </Button>
    </div>
  </div>
);

export default CarItem;
