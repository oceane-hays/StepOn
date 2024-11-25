import React, { useCallback, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SearchBar from "@/app/(component)/search";
import InformationBlock from "@/app/(component)/infosBlock";
import DayInfos from "@/app/(component)/dayInfos";

export default function BottomSheetMap({
  mapRef,
  setDestination,
  currLocation,
}: any) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for BottomSheet
  const snapPoints = ["20%", "50%", "90%"]; // Adjust percentages as needed

  // Callback for sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [showInfo, setShowInfo] = useState(true);
  const [duration, setDuration] = useState<string | undefined>();
  const [distance, setDistance] = useState<string | undefined>();

  // Callback for when a destination is set
  const handleDestinationSet = useCallback(
    (dest: any, dur: string, dist: string) => {
      setDestination(dest);
      setDuration(dur);
      setDistance(dist);
      setShowInfo(true);
    },
    [setDestination]
  );

  // Callbacks for InformationBlock buttons
  const handleStart = useCallback(() => {
    console.log("Start navigation");
    // Add your navigation start logic here
  }, []);

  const handleSaveForLater = useCallback(() => {
    console.log("Save for later");
    // Add your save for later logic here
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <SearchBar mapRef={mapRef} setDestination={setDestination} />

          {showInfo && (
            <>
              <DayInfos currLocation={currLocation} />
              <InformationBlock
                duration={duration}
                distance={distance}
                onStart={handleStart}
                onSaveForLater={handleSaveForLater}
              />
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
