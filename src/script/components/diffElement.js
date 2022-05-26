/*
    coding by Charlie 20220422
    ref:
        https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
        https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Virtual-DOM/#_4-diff-%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A9%E1%84%85%E1%85%B5%E1%84%8C%E1%85%B3%E1%86%B7-%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC
        https://gomakethings.com/dom-diffing-with-vanilla-js/
*/


// new에 없는 old attribute는 모두 제거
// 변경된 new attribute만 old에 반영
function updateAttributes($new, $old) {
    for (const {name, value} of [ ...$new.attributes ]) {
        if (value === $old.getAttribute(name)) continue;
        $old.setAttribute(name, value);
    }
    for (const {name} of [ ...$old.attributes ]) {
        const getAttrRes = $new.getAttribute(name);
        if (getAttrRes !== null && getAttrRes !== '') continue;
        $old.removeAttribute(name);
    }
}

export function diffElement($parent, $new, $old) {
    // 노드가 new에만 있는 경우 (노드 추가) => (!old && new)
    if (!$old && $new) {
        return $parent.appendChild($new);
    }

    // 노드가 old에만 있는 경우 (노드 삭제) => (old && !new)
    if ($old && !$new) {
        return $old.remove();
    }

    // old와 new 모두 string type 일 경우(new의 text로 교체)
    if ($old instanceof Text && $new instanceof Text) {
        if ($old.nodeValue === $new.nodeValue) return;
        $old.nodeValue = $new.nodeValue;
        return;
    }

    // old와 new의 태그 이름이 다를 경우 노드 변경 (old 제거 후 new 추가)
    if ($new.nodeName !== $old.nodeName) {
        const index = [ ...$parent.childNodes ].indexOf($old);
        $old.remove();
        $parent.appendChild($new, index);
        return;
    }

    // old와 new 태그 이름이 같은 경우 (attribute 비교 후 변경 부분 반영)
    if ($new.nodeName === $old.nodeName) {
        updateAttributes($new, $old);
    }

    // 자식노드들 비교 (재귀)
    const newChildren = [ ...$new.childNodes ];
    const oldChildren = [ ...$old.childNodes ];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
        diffElement($old, newChildren[i], oldChildren[i]);
    }

}