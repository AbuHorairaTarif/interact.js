import test from '@interactjs/_dev/test/test';
import Interaction from '@interactjs/core/Interaction';
import * as helpers from '@interactjs/core/tests/_helpers';
import pointerUtils from '@interactjs/utils/pointerUtils';
import Signals from '@interactjs/utils/Signals';
import PointerEvent from './PointerEvent';
test('PointerEvent constructor', (t) => {
    const type = 'TEST_EVENT';
    const pointerId = -100;
    const testPointerProp = ['TEST_POINTER_PROP'];
    const pointer = {
        pointerId,
        testPointerProp,
        pointerType: 'TEST_POINTER_TYPE',
    };
    const testEventProp = ['TEST_EVENT_PROP'];
    const event = {
        testEventProp,
    };
    const interaction = new Interaction({ signals: new Signals() });
    const eventTarget = {};
    const pointerEvent = new PointerEvent(type, pointer, event, eventTarget, interaction);
    t.equal(pointerEvent.testPointerProp, testPointerProp, 'pointerEvent is extended form pointer');
    t.equal(pointerEvent.testEventProp, testEventProp, 'pointerEvent is extended form Event');
    t.equal(pointerEvent.type, type, 'type is set correctly');
    t.equal(pointerEvent.pointerType, pointerUtils.getPointerType(pointer), 'pointerType is set correctly');
    t.equal(pointerEvent.pointerId, pointerId, 'pointerId is set correctly');
    t.equal(pointerEvent.originalEvent, event, 'originalEvent is set correctly');
    t.equal(pointerEvent.interaction, interaction, 'interaction is set correctly');
    t.equal(pointerEvent.target, eventTarget, 'target is set correctly');
    t.equal(pointerEvent.currentTarget, null, 'currentTarget is null');
    t.end();
});
test('PointerEvent methods', (t) => {
    const methodContexts = {};
    const event = ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']
        .reduce((acc, methodName) => {
        acc[methodName] = function () { methodContexts[methodName] = this; };
        return acc;
    }, helpers.newPointer());
    const pointerEvent = new PointerEvent('TEST', {}, event, null, {});
    pointerEvent.preventDefault();
    t.equal(methodContexts.preventDefault, event, 'PointerEvent.preventDefault() calls preventDefault of originalEvent');
    t.notOk(pointerEvent.propagationStopped, 'propagationStopped is false before call to stopPropagation');
    pointerEvent.stopPropagation();
    t.ok(pointerEvent.propagationStopped, 'stopPropagation sets propagationStopped to true');
    t.equal(methodContexts.stopPropagation, undefined, 'PointerEvent.stopPropagation() does not call stopPropagation of originalEvent');
    t.notOk(pointerEvent.immediatePropagationStopped, 'immediatePropagationStopped is false before call to stopImmediatePropagation');
    pointerEvent.stopImmediatePropagation();
    t.equal(methodContexts.stopImmediatePropagation, undefined, 'PointerEvent.stopImmediatePropagation() does not call stopImmediatePropagation of originalEvent');
    t.ok(pointerEvent.immediatePropagationStopped, 'stopImmediatePropagation sets immediatePropagationStopped to true');
    const origin = { x: 20, y: 30 };
    pointerEvent.subtractOrigin(origin);
    t.equal(pointerEvent.pageX, event.pageX - origin.x, 'subtractOrigin updates pageX correctly');
    t.equal(pointerEvent.pageY, event.pageY - origin.y, 'subtractOrigin updates pageY correctly');
    t.equal(pointerEvent.clientX, event.clientX - origin.x, 'subtractOrigin updates clientX correctly');
    t.equal(pointerEvent.clientY, event.clientY - origin.y, 'subtractOrigin updates clientY correctly');
    pointerEvent.addOrigin(origin);
    t.ok(['pageX', 'pageY', 'clientX', 'clientY'].reduce((allEqual, prop) => allEqual && pointerEvent[prop] === event[prop], true), 'addOrigin with the subtracted origin reverts to original coordinates');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9pbnRlckV2ZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQb2ludGVyRXZlbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQTtBQUM3QyxPQUFPLFdBQVcsTUFBTSw4QkFBOEIsQ0FBQTtBQUN0RCxPQUFPLEtBQUssT0FBTyxNQUFNLGlDQUFpQyxDQUFBO0FBQzFELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFBO0FBQ3pELE9BQU8sT0FBTyxNQUFNLDJCQUEyQixDQUFBO0FBQy9DLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFBO0FBRXpDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTtJQUN6QixNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUN0QixNQUFNLGVBQWUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDN0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxTQUFTO1FBQ1QsZUFBZTtRQUNmLFdBQVcsRUFBRSxtQkFBbUI7S0FDakMsQ0FBQTtJQUNELE1BQU0sYUFBYSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN6QyxNQUFNLEtBQUssR0FBRztRQUNaLGFBQWE7S0FDZCxDQUFBO0lBQ0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBUyxDQUFDLENBQUE7SUFDdEUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBQ3RCLE1BQU0sWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQVEsQ0FBQTtJQUU1RixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUNuRCx1Q0FBdUMs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QTtJQUVuQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUksS0FBSyxDQUFDLEtBQUssR0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLHdDQUF3QyxDQUFDLENBQUE7SUFDakcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUssTUFBTSxDQUFDLENBQUMsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO0lBQ2pHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsMENBQTBDLENBQUMsQ0FBQTtJQUNuRyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLDBDQUEwQyxDQUFDLENBQUE7SUFFbkcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQzVILHNFQUFzRSxDQUFDLENBQUE7SUFFekUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvdGVzdCdcbmltcG9ydCBJbnRlcmFjdGlvbiBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL0ludGVyYWN0aW9uJ1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL3Rlc3RzL19oZWxwZXJzJ1xuaW1wb3J0IHBvaW50ZXJVdGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9wb2ludGVyVXRpbHMnXG5pbXBvcnQgU2lnbmFscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9TaWduYWxzJ1xuaW1wb3J0IFBvaW50ZXJFdmVudCBmcm9tICcuL1BvaW50ZXJFdmVudCdcblxudGVzdCgnUG9pbnRlckV2ZW50IGNvbnN0cnVjdG9yJywgKHQpID0+IHtcbiAgY29uc3QgdHlwZSA9ICdURVNUX0VWRU5UJ1xuICBjb25zdCBwb2ludGVySWQgPSAtMTAwXG4gIGNvbnN0IHRlc3RQb2ludGVyUHJvcCA9IFsnVEVTVF9QT0lOVEVSX1BST1AnXVxuICBjb25zdCBwb2ludGVyID0ge1xuICAgIHBvaW50ZXJJZCxcbiAgICB0ZXN0UG9pbnRlclByb3AsXG4gICAgcG9pbnRlclR5cGU6ICdURVNUX1BPSU5URVJfVFlQRScsXG4gIH1cbiAgY29uc3QgdGVzdEV2ZW50UHJvcCA9IFsnVEVTVF9FVkVOVF9QUk9QJ11cbiAgY29uc3QgZXZlbnQgPSB7XG4gICAgdGVzdEV2ZW50UHJvcCxcbiAgfVxuICBjb25zdCBpbnRlcmFjdGlvbiA9IG5ldyBJbnRlcmFjdGlvbih7IHNpZ25hbHM6IG5ldyBTaWduYWxzKCkgfSBhcyBhbnkpXG4gIGNvbnN0IGV2ZW50VGFyZ2V0ID0ge31cbiAgY29uc3QgcG9pbnRlckV2ZW50ID0gbmV3IFBvaW50ZXJFdmVudCh0eXBlLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIGludGVyYWN0aW9uKSBhcyBhbnlcblxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC50ZXN0UG9pbnRlclByb3AsIHRlc3RQb2ludGVyUHJvcCxcbiAgICAncG9pbnRlckV2ZW50IGlzIGV4dGVuZGVkIGZvcm0gcG9pbnRlcicpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LnRlc3RFdmVudFByb3AsIHRlc3RFdmVudFByb3AsXG4gICAgJ3BvaW50ZXJFdmVudCBpcyBleHRlbmRlZCBmb3JtIEV2ZW50JylcblxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC50eXBlLCB0eXBlLFxuICAgICd0eXBlIGlzIHNldCBjb3JyZWN0bHknKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5wb2ludGVyVHlwZSwgcG9pbnRlclV0aWxzLmdldFBvaW50ZXJUeXBlKHBvaW50ZXIpLFxuICAgICdwb2ludGVyVHlwZSBpcyBzZXQgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQucG9pbnRlcklkLCBwb2ludGVySWQsXG4gICAgJ3BvaW50ZXJJZCBpcyBzZXQgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQub3JpZ2luYWxFdmVudCwgZXZlbnQsXG4gICAgJ29yaWdpbmFsRXZlbnQgaXMgc2V0IGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LmludGVyYWN0aW9uLCBpbnRlcmFjdGlvbixcbiAgICAnaW50ZXJhY3Rpb24gaXMgc2V0IGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LnRhcmdldCwgZXZlbnRUYXJnZXQsXG4gICAgJ3RhcmdldCBpcyBzZXQgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQuY3VycmVudFRhcmdldCwgbnVsbCxcbiAgICAnY3VycmVudFRhcmdldCBpcyBudWxsJylcblxuICB0LmVuZCgpXG59KVxuXG50ZXN0KCdQb2ludGVyRXZlbnQgbWV0aG9kcycsICh0KSA9PiB7XG4gIGNvbnN0IG1ldGhvZENvbnRleHRzID0ge30gYXMgYW55XG4gIGNvbnN0IGV2ZW50ID0gWydwcmV2ZW50RGVmYXVsdCcsICdzdG9wUHJvcGFnYXRpb24nLCAnc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uJ11cbiAgICAucmVkdWNlKChhY2MsIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgIGFjY1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHsgbWV0aG9kQ29udGV4dHNbbWV0aG9kTmFtZV0gPSB0aGlzIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBoZWxwZXJzLm5ld1BvaW50ZXIoKSlcbiAgY29uc3QgcG9pbnRlckV2ZW50ID0gbmV3IFBvaW50ZXJFdmVudCgnVEVTVCcsIHt9LCBldmVudCwgbnVsbCwge30pXG5cbiAgcG9pbnRlckV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgdC5lcXVhbChtZXRob2RDb250ZXh0cy5wcmV2ZW50RGVmYXVsdCwgZXZlbnQsXG4gICAgJ1BvaW50ZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpIGNhbGxzIHByZXZlbnREZWZhdWx0IG9mIG9yaWdpbmFsRXZlbnQnKVxuXG4gIHQubm90T2socG9pbnRlckV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAncHJvcGFnYXRpb25TdG9wcGVkIGlzIGZhbHNlIGJlZm9yZSBjYWxsIHRvIHN0b3BQcm9wYWdhdGlvbicpXG4gIHBvaW50ZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICB0Lm9rKHBvaW50ZXJFdmVudC5wcm9wYWdhdGlvblN0b3BwZWQsXG4gICAgJ3N0b3BQcm9wYWdhdGlvbiBzZXRzIHByb3BhZ2F0aW9uU3RvcHBlZCB0byB0cnVlJylcbiAgdC5lcXVhbChtZXRob2RDb250ZXh0cy5zdG9wUHJvcGFnYXRpb24sIHVuZGVmaW5lZCxcbiAgICAnUG9pbnRlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIGRvZXMgbm90IGNhbGwgc3RvcFByb3BhZ2F0aW9uIG9mIG9yaWdpbmFsRXZlbnQnKVxuXG4gIHQubm90T2socG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAnaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIGlzIGZhbHNlIGJlZm9yZSBjYWxsIHRvIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbicpXG4gIHBvaW50ZXJFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICB0LmVxdWFsKG1ldGhvZENvbnRleHRzLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiwgdW5kZWZpbmVkLFxuICAgICdQb2ludGVyRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgZG9lcyBub3QgY2FsbCBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gb2Ygb3JpZ2luYWxFdmVudCcpXG4gIHQub2socG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAnc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIHNldHMgaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIHRvIHRydWUnKVxuXG4gIGNvbnN0IG9yaWdpbiA9IHsgeDogMjAsIHk6IDMwIH1cbiAgcG9pbnRlckV2ZW50LnN1YnRyYWN0T3JpZ2luKG9yaWdpbilcblxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5wYWdlWCwgICBldmVudC5wYWdlWCAgIC0gb3JpZ2luLngsICdzdWJ0cmFjdE9yaWdpbiB1cGRhdGVzIHBhZ2VYIGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LnBhZ2VZLCAgIGV2ZW50LnBhZ2VZICAgLSBvcmlnaW4ueSwgJ3N1YnRyYWN0T3JpZ2luIHVwZGF0ZXMgcGFnZVkgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WCAtIG9yaWdpbi54LCAnc3VidHJhY3RPcmlnaW4gdXBkYXRlcyBjbGllbnRYIGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LmNsaWVudFksIGV2ZW50LmNsaWVudFkgLSBvcmlnaW4ueSwgJ3N1YnRyYWN0T3JpZ2luIHVwZGF0ZXMgY2xpZW50WSBjb3JyZWN0bHknKVxuXG4gIHBvaW50ZXJFdmVudC5hZGRPcmlnaW4ob3JpZ2luKVxuICB0Lm9rKFsncGFnZVgnLCAncGFnZVknLCAnY2xpZW50WCcsICdjbGllbnRZJ10ucmVkdWNlKChhbGxFcXVhbCwgcHJvcCkgPT4gYWxsRXF1YWwgJiYgcG9pbnRlckV2ZW50W3Byb3BdID09PSBldmVudFtwcm9wXSwgdHJ1ZSksXG4gICAgJ2FkZE9yaWdpbiB3aXRoIHRoZSBzdWJ0cmFjdGVkIG9yaWdpbiByZXZlcnRzIHRvIG9yaWdpbmFsIGNvb3JkaW5hdGVzJylcblxuICB0LmVuZCgpXG59KVxuIl19