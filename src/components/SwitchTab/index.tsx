import React from 'react'
import styled from 'styled-components'

export const SwitchTabWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.text5};
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow-x: auto;
    overflow-y: hidden;
    `};
`

export const Tab = styled.button<{ selected: boolean }>`
  border: none;
  background: none;
  padding: 7px 0;
  margin-right: 40px;
  font-size: 20px;
  font-weight: 500;
  font-family: Futura PT;
  color: ${({ selected, theme }) => (selected ? theme.primary1 : theme.text5)};
  border-bottom: 2px solid ${({ selected, theme }) => (selected ? theme.primary4 : 'transparent')};
  margin-bottom: -1px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary1};
  }
`

export default function SwitchTab({
  currentTab,
  onTabClick,
  tabs
}: {
  currentTab: string
  onTabClick: (tab: string) => () => void
  tabs: { [key: string]: string }
}) {
  return (
    <SwitchTabWrapper>
      {Object.keys(tabs).map(tab => {
        const tabName = tabs[tab as keyof typeof tabs]
        return (
          <Tab key={tab} onClick={onTabClick(tab)} selected={currentTab === tab}>
            {tabName}
          </Tab>
        )
      })}
    </SwitchTabWrapper>
  )
}