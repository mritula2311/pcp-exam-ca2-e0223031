import { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { isValidOrder } from '../utils/orderUtils'

const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getStatusText = (item, keys) => {
  if (!item || typeof item !== 'object') {
    return ''
  }

  const matchKey = keys.find((key) => item[key] !== undefined)
  return matchKey ? normalizeText(item[matchKey]) : ''
}

const getBooleanFlag = (item, keys) => {
  if (!item || typeof item !== 'object') {
    return null
  }

  const matchKey = keys.find((key) => typeof item[key] === 'boolean')
  return matchKey ? item[matchKey] : null
}

const hasOrderStatus = (order) => {
  const flag = getBooleanFlag(order, [
    'isDelivered',
    'delivered',
    'isCancelled',
    'cancelled',
    'canceled',
  ])
  if (flag !== null) {
    return true
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status !== ''
}

const isDelivered = (order) => {
  const flag = getBooleanFlag(order, ['isDelivered', 'delivered'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status === 'delivered'
}

const isCancelled = (order) => {
  const flag = getBooleanFlag(order, ['isCancelled', 'cancelled', 'canceled'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(order, [
    'status',
    'state',
    'orderStatus',
    'deliveryStatus',
  ])
  return status === 'cancelled' || status === 'canceled'
}

const isGoalAchieved = (activity) => {
  const flag = getBooleanFlag(activity, ['goalAchieved', 'achieved'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(activity, ['status', 'state', 'activityStatus'])
  if (status.includes('not achieved')) {
    return false
  }
  return status.includes('achieved')
}

const isGoalNotAchieved = (activity) => {
  const flag = getBooleanFlag(activity, ['goalAchieved', 'achieved'])
  if (flag !== null) {
    return !flag
  }

  const status = getStatusText(activity, ['status', 'state', 'activityStatus'])
  return status.includes('not achieved')
}

const isActiveCourse = (course) => {
  const flag = getBooleanFlag(course, ['isActive', 'active'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(course, ['status', 'state', 'courseStatus'])
  return status === 'active'
}

const isInactiveCourse = (course) => {
  const flag = getBooleanFlag(course, ['isActive', 'active'])
  if (flag !== null) {
    return !flag
  }

  const status = getStatusText(course, ['status', 'state', 'courseStatus'])
  return status === 'inactive'
}

const isActiveEvent = (event) => {
  const flag = getBooleanFlag(event, ['isActive', 'active'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(event, [
    'status',
    'state',
    'eventStatus',
    'availability',
  ])
  return status === 'active'
}

const isSoldOutEvent = (event) => {
  const flag = getBooleanFlag(event, ['isSoldOut', 'soldOut'])
  if (flag !== null) {
    return flag
  }

  const status = getStatusText(event, [
    'status',
    'state',
    'eventStatus',
    'availability',
  ])
  return status.includes('sold out') || status.includes('soldout')
}

const StatsPage = () => {
  const { data, loading, error } = useContext(AppContext)
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const validOrders = orders
    .filter((order) => isValidOrder(order))
    .filter((order) => hasOrderStatus(order))
  const activities = Array.isArray(data?.activities) ? data.activities : []
  const courses = Array.isArray(data?.courses) ? data.courses : []
  const events = Array.isArray(data?.events) ? data.events : []

  const totalOrders = validOrders.reduce((count) => count + 1, 0)
  const deliveredOrders = validOrders.reduce(
    (count, order) => count + (isDelivered(order) ? 1 : 0),
    0,
  )
  const cancelledOrders = validOrders.reduce(
    (count, order) => count + (isCancelled(order) ? 1 : 0),
    0,
  )

  const totalActivities = activities.reduce((count) => count + 1, 0)
  const goalAchieved = activities.reduce(
    (count, activity) => count + (isGoalAchieved(activity) ? 1 : 0),
    0,
  )
  const goalNotAchieved = activities.reduce(
    (count, activity) => count + (isGoalNotAchieved(activity) ? 1 : 0),
    0,
  )

  const totalCourses = courses.reduce((count) => count + 1, 0)
  const activeCourses = courses.reduce(
    (count, course) => count + (isActiveCourse(course) ? 1 : 0),
    0,
  )
  const inactiveCourses = courses.reduce(
    (count, course) => count + (isInactiveCourse(course) ? 1 : 0),
    0,
  )

  const totalEvents = events.reduce((count) => count + 1, 0)
  const activeEvents = events.reduce(
    (count, event) => count + (isActiveEvent(event) ? 1 : 0),
    0,
  )
  const soldoutEvents = events.reduce(
    (count, event) => count + (isSoldOutEvent(event) ? 1 : 0),
    0,
  )

  useEffect(() => {
    window.appState = {
      total: totalOrders,
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      totalActivities,
      goalAchieved,
      goalNotAchieved,
      totalCourses,
      activeCourses,
      inactiveCourses,
      totalEvents,
      activeEvents,
      soldoutEvents,
    }
  }, [
    totalOrders,
    deliveredOrders,
    cancelledOrders,
    totalActivities,
    goalAchieved,
    goalNotAchieved,
    totalCourses,
    activeCourses,
    inactiveCourses,
    totalEvents,
    activeEvents,
    soldoutEvents,
  ])

  if (loading) {
    return (
      <section className="page">
        <p className="status-message">Loading data...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <p className="status-message">{error}</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>Stats</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p data-testid="total-orders">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Delivered Orders</h2>
          <p data-testid="delivered-orders">{deliveredOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Cancelled Orders</h2>
          <p data-testid="cancelled-orders">{cancelledOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Total Activities</h2>
          <p data-testid="total-activities">{totalActivities}</p>
        </div>
        <div className="stat-card">
          <h2>Goal Achieved</h2>
          <p data-testid="goal-achieved">{goalAchieved}</p>
        </div>
        <div className="stat-card">
          <h2>Goal Not Achieved</h2>
          <p data-testid="goal-not-achieved">{goalNotAchieved}</p>
        </div>
        <div className="stat-card">
          <h2>Total Courses</h2>
          <p data-testid="total-courses">{totalCourses}</p>
        </div>
        <div className="stat-card">
          <h2>Active Courses</h2>
          <p data-testid="active-courses">{activeCourses}</p>
        </div>
        <div className="stat-card">
          <h2>Inactive Courses</h2>
          <p data-testid="inactive-courses">{inactiveCourses}</p>
        </div>
        <div className="stat-card">
          <h2>Total Events</h2>
          <p data-testid="total-events">{totalEvents}</p>
        </div>
        <div className="stat-card">
          <h2>Active Events</h2>
          <p data-testid="active-events">{activeEvents}</p>
        </div>
        <div className="stat-card">
          <h2>Sold Out Events</h2>
          <p data-testid="soldout-events">{soldoutEvents}</p>
        </div>
      </div>
    </section>
  )
}

export default StatsPage
