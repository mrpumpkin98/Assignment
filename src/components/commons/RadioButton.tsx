import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface RadioButtonProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export default function RadioButton({
  options,
  selectedOption,
  onSelect,
}: RadioButtonProps) {
  return (
    <View style={styles.radioButtonGroup}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.radioButtonContainer,
            selectedOption === option && styles.radioButtonSelected,
          ]}
          onPress={() => onSelect(option)}>
          <Text style={styles.radioButtonLabel}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButtonContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});
