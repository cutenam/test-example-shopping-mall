import cn from 'classnames';
import React, { useState } from 'react';
import './text.css';

/**
 * placeholder 설정 : 텍스트필드에 플레이스 홀더 설정, prop으로 받아서 설정, 없을 경우 기본값 설정
 * className에 따른 css class 설정 : prop으로 받아서 설정, 텍스트필드 스타일 커스터마이징
 * 텍스트를 입력할 때마다 onChange 핸들러 호출
 * focus 시 border 스타일 변경 : 포커스가 생기면 파란색 보더로 변경
 * focus 시 onFocus 핸들러 호출 : 포커스가 생길때 핸들러가 호출되는지 확인
 * Enter 키 입력 시 onEnter 핸들러 호출
 */
export default function TextField({
  placeholder,
  className,
  onFocus,
  onChange,
  onEnter,
}) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const changeValue = ev => {
    setValue(ev.target.value);
    onChange?.(ev.target.value);
  };
  const focus = () => {
    setFocused(true);
    onFocus?.();
  };
  const blur = () => {
    setFocused(false);
  };
  const pressEnter = ev => {
    if (ev.key === 'Enter' && !ev.nativeEvent.isComposing) {
      ev.preventDefault();
      onEnter?.(value);
    }
  };

  return (
    <input
      type="text"
      className={cn('text-input', className)}
      onChange={changeValue}
      onFocus={focus}
      onBlur={blur}
      onKeyDown={pressEnter}
      placeholder={placeholder || '텍스트를 입력해 주세요.'}
      value={value}
      style={
        focused ? { borderWidth: 2, borderColor: 'rgb(25, 118, 210)' } : null
      }
    />
  );
}
