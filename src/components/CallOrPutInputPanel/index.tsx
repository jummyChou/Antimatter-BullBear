import { Currency } from '@uniswap/sdk'
import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import CurrencyLogo from '../CurrencyLogo'
import { AutoRow } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import CallIcon from '../../assets/svg/call_icon.svg'
import PutIcon from '../../assets/svg/put_icon.svg'

import useTheme from '../../hooks/useTheme'
import { LabeledCard } from 'components/Card'

const InputRow = styled.div<{ selected: boolean; halfWidth?: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 14px;
  height: 3rem;
  padding: ${({ selected }) => (selected ? '0 0.5rem 0 1rem' : '0 0.65rem 0 0.75rem')};
  width: ${({ halfWidth }) => (halfWidth ? '50%' : '55%')}};
  ${({ theme }) => theme.flexRowNoWrap}
`

const CustomNumericalInput = styled(NumericalInput)`
  background: transparent;
  font-size: 16px;
`

const LabelRow = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  ${({ theme }) => theme.flexRowNoWrap}

  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
  margin-bottom: 4px;
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean; negativeMarginTop?: string }>`
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  z-index: 1;
  ${({ theme }) => theme.flexColumnNoWrap}
  ${({ negativeMarginTop }) => `${negativeMarginTop ? 'margin-top: ' + negativeMarginTop : ''}`}
`

const Container = styled.div<{ hideInput: boolean }>``

const StyledTokenName = styled.span<{ active?: boolean }>`
  font-size: 16px;
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
`

const CallOrPutIcon = styled.img`
  position: absolute;
  margin-top: 16px;
  margin-left: 16px;
`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.bg3};
  border: 1px solid transparent;
  border-radius: 49px;
  font-size: 0.875rem;
  padding: 0 1rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface CallOrPutInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  label?: string
  currency?: Currency | undefined
  hideBalance?: boolean
  hideInput?: boolean
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
  halfWidth?: boolean
  negativeMarginTop?: string
  defaultSymbol?: string
  isCall?: boolean
  balance?: string
}

export default function CallOrPutInputPanel({
  value,
  onUserInput,
  label = 'Output',
  currency,
  hideInput = false,
  id,
  halfWidth,
  defaultSymbol,
  negativeMarginTop,
  isCall,
  onMax,
  hideBalance,
  balance
}: CallOrPutInputPanelProps) {
  const theme = useTheme()

  return (
    <InputPanel id={id} negativeMarginTop={negativeMarginTop}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <AutoRow justify="space-between">
              <TYPE.body color={theme.text3} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {!hideBalance && (
                <TYPE.body
                  onClick={onMax}
                  color={theme.text3}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {`Your balance: ${!!currency && balance ? balance : '-'}`}
                </TYPE.body>
              )}
            </AutoRow>
          </LabelRow>
        )}
        <Aligner>
          <LabeledCard
            style={{ width: halfWidth ? '50%' : '100%', marginRight: 15 }}
            content={
              <Aligner>
                <CurrencyLogo currency={currency} size={'24px'} />
                <CallOrPutIcon src={isCall ? CallIcon : PutIcon} />
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  {defaultSymbol
                    ? defaultSymbol
                    : currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) +
                      '...' +
                      currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : currency?.symbol}
                </StyledTokenName>
              </Aligner>
            }
          />

          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} halfWidth={halfWidth} selected>
            {!hideInput && (
              <>
                <CustomNumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={val => {
                    onUserInput(val)
                  }}
                />
                {onMax && balance && <StyledBalanceMax onClick={onMax}>Max</StyledBalanceMax>}
              </>
            )}
          </InputRow>
        </Aligner>
      </Container>
    </InputPanel>
  )
}
