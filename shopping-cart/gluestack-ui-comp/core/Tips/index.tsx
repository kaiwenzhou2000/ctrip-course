import React, { useState } from 'react';
import { Modal, Alert, StyleSheet, Pressable, View, Text } from "react-native";
export const Tips = ({ confirm, visible, text }: {visible: boolean, confirm: () => void, text: string}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{text}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => confirm()}>
          <Text style={styles.textStyle}>确认</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});