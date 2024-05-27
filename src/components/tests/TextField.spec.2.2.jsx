import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

/**
 * 2.2. 테스트 환경과 매처
 * (1) screen.debug() 확인 : 현재 컴포넌트의 dom 구조 확인
 * (2) it, test, describe 함수의 차이
 * (3) matcher : expect 함수에서 사용함. 기대결과 확인을 위한 API 집합(API문서에서 확인 가능), 라이브러리 이용하여 matcher 를 추가할 수 있음
 */

it('className prop으로 설정한 css class 가 적용된다.', async () => {
  // 1. Arrange 단계
  await render(<TextField className="my-class"/>);

  // 2. Act 단계
  // 3. Assert 단계
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // 4. 결과 확인
  expect(textInput).toHaveClass('my-class');

  //screen.debug();
  // 아래와 같이 현재 컴포넌트의 dom 구조를 확인할 수 있다.
  /**
   * stdout | src/components/tests/TextField.spec.jsx > className prop으로 설정한 css class 가 적용된다.
   * <body>
   *   <div>
   *     <input
   *       class="text-input my-class"
   *       placeholder="텍스트를 입력해 주세요."
   *       type="text"
   *       value=""
   *     />
   *   </div>
   * </body>
   */
});

  // it 함수: 테스트 기대결과를 확인하기 위해 작성하는 함수, 테스트의 기본단위가 된다. 컴포넌트의 루트 즉, 최상위 컨텍스트에서 실행됨
  // 기대결과 === 실행결과, 테스트 성공
  // 기대결과 !== 실행결과, 테스트 실패
  // test 함수의 별칭(alias)
  // # it('should~~'), test('if~~~')
  // # describe() : 테스트 그룹을 만들수 있다. 독립된 컨텍스트를 만들어서 다른 테스트에 영향을 주지 않고 설정, 함수 등을 사용할 수 있음
  // # describe('group', ()=> {
  //   function someFn() {
  //   }
  // #  it('test', () => {
  //   });
  // });
  // #ㅍexpect : assertion, 단언, 테스트를 위한 조건을 서술한다.


// describe 콜백함수는 async 가 될 수 없음
describe('placeholder 테스트', () =>{
  it('기본 placeholder "텍스트를 입력해 주세요." 가 표시된다.', async () => {
    await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props 에 따라 placeholder 텍스트메시지가 변경된다.', async () => {
    await render(<TextField placeholder='상품명을 입력해주세요.'/>);
    const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');
    screen.debug();
    expect(textInput).toBeInTheDocument();
  });});
