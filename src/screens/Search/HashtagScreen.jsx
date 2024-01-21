import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import EveryoneSearch from '../../components/SearchComponents/EveryoneSearch'

const HashtagScreen = () => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <EveryoneSearch/>
      <EveryoneSearch/>
      <EveryoneSearch/>
      <EveryoneSearch/>
      <EveryoneSearch/>
    </ScrollView>
);

export default HashtagScreen

const styles = StyleSheet.create({})