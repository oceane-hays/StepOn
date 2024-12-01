// import * as React from 'react';
// import { View, useWindowDimensions } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
//
// const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
// });
//
// const routes = [
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
// ];
//
// export default function TabViewExample() {
//     const layout = useWindowDimensions();
//     const [index, setIndex] = React.useState(0);
//
//     return (
//         <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: layout.width }}
//         />
//     );
// }