import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { styles } from '../select/style'

function CountrySelect({ value, onChange }) {

  const options = useMemo(() => countryList().getData(), [])



  return <Select placeholder="Choose Your Nationality" styles={styles} options={options} value={value} onChange={onChange} />
}

export default CountrySelect