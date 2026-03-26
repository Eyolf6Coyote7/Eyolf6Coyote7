package com.workflow.mobile

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.workflow.mobile.ui.screens.ApprovalsScreen
import com.workflow.mobile.ui.screens.DashboardScreen
import com.workflow.mobile.ui.screens.LoginScreen

object Routes {
    const val LOGIN = "login"
    const val DASHBOARD = "dashboard"
    const val APPROVALS = "approvals"
}

@Composable
fun WorkflowApp() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Routes.LOGIN) {
        composable(Routes.LOGIN) {
            LoginScreen(onLoginSuccess = {
                navController.navigate(Routes.DASHBOARD) {
                    popUpTo(Routes.LOGIN) { inclusive = true }
                }
            })
        }
        composable(Routes.DASHBOARD) {
            DashboardScreen(
                onNavigateToApprovals = { navController.navigate(Routes.APPROVALS) },
                onLogout = {
                    navController.navigate(Routes.LOGIN) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }
        composable(Routes.APPROVALS) {
            ApprovalsScreen(onBack = { navController.popBackStack() })
        }
    }
}
