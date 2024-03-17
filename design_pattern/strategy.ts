/**
 * Strategy
 * @author huang
 * @date 2024-03-16
 */

/**
 * 旅游工具选择
 */
interface TravelingStrategy {
    goWork(num: number): string
}

class WalkTravelingStrategy implements TravelingStrategy {
    goWork(num: number): string {
        return '徒步旅行'
    }
}

class CarTravelingStrategy implements TravelingStrategy {
    goWork(num: number): string {
        return '开车旅行'
    }
}

class BicycleTravelingStrategy implements TravelingStrategy {
    goWork(num: number): string {
        return '骑行旅行'
    }
}

class Context {
    strategy: TravelingStrategy
    constructor(strategy: TravelingStrategy) {
        this.strategy = strategy
    }

    doStrategy(num: number): string {
        return this.strategy.goWork(num)
    }
}

function main1() {
    const ctx1 = new Context(new WalkTravelingStrategy())
    console.log('ctx1.doStrategy(1)  ---->  ', ctx1.doStrategy(1))
    const ctx2 = new Context(new CarTravelingStrategy())
    console.log('ctx2.doStrategy(10)  ---->  ', ctx2.doStrategy(10))
    const ctx3 = new Context(new BicycleTravelingStrategy())
    console.log('ctx3.doStrategy(100)  ---->  ', ctx3.doStrategy(100))
}
main1()

// ----------------------------------------------------------------

/**
 * 奖金等级计算
 */

// 通常情况下，通过不同等级计算不同的奖金，需要写很多if-else
const calculateBonus = (level: string, salary: number): number => {
    if (level === 'S') {
        return salary * 4
    }
    if (level === 'A') {
        return salary * 3
    }
    if (level === 'B') {
        return salary * 2
    }
    return 0
}
console.log(calculateBonus('S', 4000)) //输出16000
console.log(calculateBonus('A', 3000)) //输出9000
console.log(calculateBonus('B', 2000)) //输出4000

// 通过接口、类实现
interface BonusStrategy {
    calculateBonus(salary: number): number
}
class StuffA implements BonusStrategy {
    calculateBonus(salary: number): number {
        return salary * 5
    }
}
class StuffB implements BonusStrategy {
    calculateBonus(salary: number): number {
        return salary * 3
    }
}
class StuffC implements BonusStrategy {
    calculateBonus(salary: number): number {
        return salary * 2
    }
}
class BonusContext {
    strategy: BonusStrategy

    constructor(strategy: BonusStrategy) {
        this.strategy = strategy
    }

    doCalculateBonus(salary: number) {
        console.log(this.strategy.calculateBonus(salary))
    }
}
function main2() {
    const BonusContextA = new BonusContext(new StuffA())
    BonusContextA.doCalculateBonus(5000)
    const BonusContextB = new BonusContext(new StuffB())
    BonusContextB.doCalculateBonus(5000)
    const BonusContextC = new BonusContext(new StuffC())
    BonusContextC.doCalculateBonus(5000)
}
main2()

// 通过 Map / 对象 等映射实现
const _map_ = new Map<string, BonusStrategy>()
_map_.set('A', new StuffA())
_map_.set('B', new StuffB())
_map_.set('C', new StuffC())

// @ts-ignore
_map_.get('A').calculateBonus(5000)
// @ts-ignore
_map_.get('B').calculateBonus(5000)
// @ts-ignore
_map_.get('C').calculateBonus(5000)
