import React, { useState } from "react";
import CartItem from '../CarItem/carItem';
import { useEffect } from "react";
import { Block, Nav, NavItem, Inline, Button, useTheme, Arrow } from "vcc-ui";
import { RouteComponentProps, withRouter } from 'react-router';
import './carContainerStyle.css';

export interface IcartObjType {
  id: string;
  modelName: string;
  bodyType: String;
  modelType: string;
  imageUrl: string
}

export interface Props extends RouteComponentProps<{ stepId: string }> {

}

const CarContainer: React.FC<Props> = (props) => {
  // theme variable
  const theme = useTheme();

  //car List
  const [carList, setCarList] = useState<IcartObjType[]>([]);

  const [showList, setShowList] = useState<IcartObjType[]>([]);
  const [carType, setCarType] = useState<string>("all");
  const [carTypeList, setCarTypeList] = useState<string[]>([]);
  const [padding, setPadding] = useState(0);
  useEffect(() => {
    setPadding(0);
    setShowList([
      ...carType === "all" ? carList : carList.filter((obj) => obj.bodyType === carType)
    ])
  }, [carType])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch('/api/cars.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setCarList(myJson);
        setShowList(myJson);
        setCarTypeList(myJson.reduce((acc: any, next: IcartObjType) => {
          return { ...acc, [next.bodyType as keyof any]: false }
        }, { all: true }));
      });
  }

  return (
    <div className="hiddenOverflow" >
      <div style={{ display: "flex" }}>
        <Nav>
          {
            Object.keys(carTypeList).map((objkey: string, i: number) => <NavItem
              onClick={() => setCarType(objkey)}
              key={`${i} ${objkey}`}
              isActive={carType === objkey}
            >
              {objkey.toUpperCase()}
            </NavItem>
            )
          }
        </Nav>
      </div>
      <Block extend={{
        [theme.breakpoints.onlyS]: {
          width: '80%'
        },
        [theme.breakpoints.fromM]: {
          width: "25%"
        },
      }}
      >
        <div className='scroolDiv' style={{ transform: `translate3d(-${padding * 100}%, 0px, 0px)` }}>
          {
            showList.map((obj: IcartObjType, index: number) =>
              <div key={`${obj.id} ${index}`} className='carCard' >
                <CartItem cardData={obj}
                  learn={(id) => {
                    props.history.push(`/learn/${id}`);
                  }}
                  shop={(id) => {
                    props.history.push(`/shop/${id}`);
                  }}
                />
              </div>
            )
          }
        </div>
      </Block>
      <Block extend={{
        display: "flex",
        [theme.breakpoints.onlyS]: {
          alignItems: 'center'
        },
        [theme.breakpoints.fromM]: {
          alignItems: 'flex-end'
        },
        flexDirection: 'column',

      }}>
        <Block
          extend={{
            [theme.breakpoints.onlyS]: {
              display: "flex",
            },
            [theme.breakpoints.fromM]: {
              display: "none",
            },
          }}
        >
          {
            carList.map((obj: IcartObjType, index: number) => <div key={`${obj.id} ${index}`} className='mobileButtonContaoner'>
              <div
                className='mobileButtonItem'
                style={{
                  opacity: index === padding ? 1 : 0,
                }} /></div>)
          }

        </Block>

        <Inline extend={{
          [theme.breakpoints.onlyS]: {
            display: "none",
          },
          [theme.breakpoints.fromM]: {
            display: "inline",
          },
        }}
        >
          <button
            aria-label="Next"
            disabled={!padding}
            onClick={() => setPadding(padding - 1)}
            className='carButtonClass'
            style={{ border: padding ? '1px solid black' : '1px solid #d2cece' }} >
            <Arrow direction="left" color={padding ? 'black' : '#d2cece'} size={15} />
          </button>
          <button
            aria-label="Previous"
            disabled={padding + 4 === carList.length}
            onClick={() => setPadding(padding + 1)}
            className='carButtonClass'
            style={{ border: padding + 4 !== carList.length ? '1px solid black' : '1px solid #d2cece' }} >
            <Arrow direction="right" color={padding + 4 !== carList.length ? 'black' : '#d2cece'} size={15} />
          </button>
        </Inline>
      </Block>
    </div>
  );
};

export default withRouter(CarContainer);