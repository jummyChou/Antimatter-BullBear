import React from 'react'
import { Plus } from 'react-feather'
import { Currency } from '@uniswap/sdk'
import { OutlineCard } from '../Card'
import { TYPE } from '../../theme'
import { RowBetween } from '../Row'
import useTheme from '../../hooks/useTheme'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import CurrencyLogo from '../CurrencyLogo'

const TokenPanel = styled.div`
  flex: 1;
  height: 2.5rem;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0 16px;
  display: flex;
`

export function GenerateBar({
  cardTitle,
  callVol,
  putVol,
  currency0,
  currency1,
  subTitle
}: {
  cardTitle: string
  callVol?: string
  putVol?: string
  currency0?: Currency | undefined
  currency1?: Currency | undefined
  subTitle?: string
}) {
  const theme = useTheme()

  return (
    <AutoColumn>
      <RowBetween style={{ padding: '8px 0' }}>
        <TYPE.subHeader fontWeight={500} fontSize={14} color={theme.text3}>
          {cardTitle}
        </TYPE.subHeader>
      </RowBetween>
      <OutlineCard style={{ backgroundColor: 'rgba(0,0,0,.2)', padding: '16px 20px' }}>
        <RowBetween>
          <AutoColumn style={{ flex: 1, maxWidth: '45%' }} gap={'8px'}>
            <TYPE.subHeader fontWeight={500} fontSize={14} color={theme.text3}>
              {subTitle ?? 'Input token'}
            </TYPE.subHeader>
            <TokenPanel>
              {currency0 && <CurrencyLogo currency={currency0} size={'20px'} />}
              {}
              <TYPE.black fontWeight={500} fontSize={14} marginLeft={'8px'} flex={1}>
                {(currency0 && currency0.symbol && currency0.symbol.length > 20
                  ? currency0.symbol.slice(0, 4) +
                    '...' +
                    currency0.symbol.slice(currency0.symbol.length - 5, currency0.symbol.length)
                  : currency0?.symbol) || 'Call Token'}
              </TYPE.black>
              <TYPE.black fontWeight={500} fontSize={14} marginLeft={'8px'}>
                {callVol?.[0] === '-' ? callVol.slice(1) : callVol}
              </TYPE.black>
            </TokenPanel>
          </AutoColumn>

          <Plus size="24" color={theme.text2} style={{ margin: '24px 10px 0' }} />

          <AutoColumn style={{ flex: 1, maxWidth: '45%' }} gap={'8px'}>
            <TYPE.subHeader fontWeight={500} fontSize={14} color={theme.text3}>
              {subTitle ?? 'Input token'}
            </TYPE.subHeader>
            <TokenPanel>
              {currency1 && <CurrencyLogo currency={currency1} size={'20px'} />}
              <TYPE.subHeader fontWeight={500} fontSize={14} color={theme.text1} marginLeft={'8px'} flex={1}>
                {(currency1 && currency1.symbol && currency1.symbol.length > 20
                  ? currency1.symbol.slice(0, 4) +
                    '...' +
                    currency1.symbol.slice(currency1.symbol.length - 5, currency1.symbol.length)
                  : currency1?.symbol) || 'Put Token'}
              </TYPE.subHeader>
              <TYPE.black fontWeight={500} fontSize={14} marginLeft={'8px'}>
                {putVol?.[0] === '-' ? putVol.slice(1) : putVol}
              </TYPE.black>
            </TokenPanel>
          </AutoColumn>
        </RowBetween>
      </OutlineCard>
    </AutoColumn>
  )
}
