/**
 * @author huang
 * @date 2024-03-27
 */
class ListNode {
    val: number
    next: ListNode | null

    constructor(val: number, next?: ListNode | null) {
        this.val = val
        this.next = next ? next : null
    }
}

class LinkedList {
    head: ListNode | null

    constructor() {
        this.head = null
    }

    append(val: number): void {
        if (!this.head) {
            this.head = new ListNode(val)
            return
        }
        let current = this.head
        while (current.next !== null) {
            current = current.next
        }
        current.next = new ListNode(val)
    }

    printList(): void {
        let current = this.head
        while (current !== null) {
            console.log('current.val  ---->  ', current.val)
            current = current.next
        }
        console.log()
    }
}

// 使用
const ll = new LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.printList()  // 输出: 1 2 3
