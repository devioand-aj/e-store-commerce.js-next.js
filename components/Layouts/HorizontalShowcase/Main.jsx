import React from 'react'

import Wrapper from './Wrapper';
import Scroll from './Scroll';
import Items from './Items';
import { Toast } from '../../Common';

export default function Main({ label, items, toast, variant, onCloseToast }) {
   return (
      <Wrapper label={label}>
        {toast && <Toast toast={toast} onClose={onCloseToast} />}
        <Scroll>
          <Items items={items} variant={variant} />
        </Scroll>
      </Wrapper>
   )
}
