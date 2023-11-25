import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./colors.css"

const CheckBoxCategories = ({ categoryCharacteristicsResponse, formik }) => {
  // Asegúrate de tener formik disponible en este componente

  return (
    categoryCharacteristicsResponse?.map((item) => (
      <div key={item.id_category}>
        <hr />
        <h3>{item.title[0].toUpperCase() + item.title.slice(1)}</h3>
        <hr />
        
        <Grid container spacing={2}>
          {item.characteristics?.map((characteristic) => (
            <Grid item key={characteristic.id_characteristic} xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`characteristics[${characteristic.id_characteristic}]`}
                    value={characteristic.id_characteristic}
                    // Asegúrate de tener formik disponible en este componente
                    checked={formik.values.characteristics.includes(characteristic.id_characteristic)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        formik.setFieldValue('characteristics', [...formik.values.characteristics, characteristic.id_characteristic]);
                      } else {
                        formik.setFieldValue('characteristics', formik.values.characteristics.filter((c) => c !== characteristic.id_characteristic));
                      }
                    }}
                    style={{
                      color: '#f76402',
                    }}
                  />
                }
                label={characteristic.title}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    ))
  );
};

export default CheckBoxCategories;
