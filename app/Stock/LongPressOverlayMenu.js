import React from "react";
import { Overlay, Button } from "react-native-elements";

export default LongPressOverlayMenu = props => {
  return (
    <Overlay
      overlayStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        width: 300
      }}
      isVisible={props.isVisible}
      onBackdropPress={() => props.toggle(!props.isVisible)}
    >
      {props.menuData.map(item => (
        <Button
          containerStyle={{ width: "100%", margin:5 }}
          title={item.title}
          type="outline"
          onPress={()=>{props.toggle(!props.isVisible);item.function(props.option)}}
        />
      ))}
    </Overlay>
  );
};
